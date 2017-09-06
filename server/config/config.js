
const dotenv = require('dotenv');
dotenv.config();
const appEnv = process.env.NODE_ENV;
const config = {
  "development" :{
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME+'-'+process.env.NODE_ENV.toLowerCase(),
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  options: { dialect: process.env.DB_DIALECT, host: process.env.DB_HOST },
  secret: 'andela'
  }
};
module.exports =  config;