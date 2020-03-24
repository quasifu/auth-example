module.exports = {
  aws_table_name: process.env.TABLE_NAME,
  aws_remote_config: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_SECRET,
    region: process.env.REGION
  }
};
