const config = require("../config");
var app = require("express")();
var jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");
const atob = require("atob");
AWS.config.update(config.aws_remote_config);

module.exports = {
  getStatus: (req, res) => {
    res.json({ status: true });
  },
  authenticate: (req, res) => {
    let authorization = req.header("Authorization");
    if (!authorization) {
      return res.sendStatus(401);
    }
    let token = authorization.substring(
      authorization.indexOf("Basic ") + "Basic ".length
    );
    let clientIdentifiers = [];
    try {
      let decrypted = atob(token);
      clientIdentifiers = decrypted.split(":");
    } catch (e) {
      return res.sendStatus(401);
    }
    if (clientIdentifiers.length != 2) {
      return res.sendStatus(401);
    }
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: config.aws_table_name,
      KeyConditionExpression: "clientId = :i",
      FilterExpression: "clientSecret = :j",
      ExpressionAttributeValues: {
        ":i": clientIdentifiers[0],
        ":j": clientIdentifiers[1]
      }
    };
    docClient.query(params, function(err, data) {
      if (err) {
        return res.send({
          success: false,
          message: `Error: Server error ${err}`
        });
      } else {
        const { Items } = data;
        if (Items.length > 0) {
          var token = jwt.sign(
            { name: Items[0].name, role: Items[0].role },
            process.env.SECRET
          );
          return res.send(token);
        } else {
          return res.sendStatus(401);
        }
      }
    });
  }
};
