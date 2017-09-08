
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  dialect : process.env.DB_DIALECT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME+'-'+process.env.NODE_ENV.toLowerCase(),
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  options: { dialect: process.env.DB_DIALECT, host: process.env.DB_HOST },
  production: {
    use_env_variable: process.env.DATABASE_URL
  }
};