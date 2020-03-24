module.exports = {
  aws_table_name: process.env.TABLE_NAME,
  aws_remote_config: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    region: process.env.REGION
  }
};
