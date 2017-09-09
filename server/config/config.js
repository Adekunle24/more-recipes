
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  dialect: process.env.DB_DIALECT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: `${process.env.DB_NAME}-${process.env.NODE_ENV.toLowerCase()}`,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  options: { dialect: process.env.DB_DIALECT, host: process.env.DB_HOST },
  production: {
    use_env_variable: 'postgres://qakfltqmtcyvka:e9d49c0ed540948dcc8d1a0c08fee855ae3ae79eed480acedee823b2424418bf@ec2-54-163-249-237.compute-1.amazonaws.com:5432/d1vuq5a3scngfe',
    host: '127.0.0.1',
    dialect: 'postgres',
    url: 'postgres://qakfltqmtcyvka:e9d49c0ed540948dcc8d1a0c08fee855ae3ae79eed480acedee823b2424418bf@ec2-54-163-249-237.compute-1.amazonaws.com:5432/d1vuq5a3scngfe'
  }
};
