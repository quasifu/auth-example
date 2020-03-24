const express = require("express");
const cors = require("cors");
const server = express();
const routes = require("./routes");

server.use(cors());
server.use(express.urlencoded({ extended: true, strict: false }));
server.use(express.json());

server.post("/v1/token", routes.authenticate);
server.get("/", routes.getStatus);

module.exports = server;
