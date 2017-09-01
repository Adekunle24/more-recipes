import env from 'dotenv';
env.config();
import fs from 'fs';
import Sequelize from 'sequelize';
import config from './config.json';
import path from 'path';

const envData = process.env.NODE_ENV || 'production';
let sequelizeApp = new Sequelize({'dialect':'postgres'});

if(envData==='production')
{
  sequelizeApp = new Sequelize(envData.DB_NAME,envData.DB_USERNAME,envData.DB_PASSWORD,{'dialect':envData.DIALECT,'host':envData.HOST });
}
else{
  const configData = config[envData];
  sequelizeApp = new Sequelize(configData.database,configData.username, configData.password,configData.options);
}
const sequelizeObj = { 'sequelizeApp':sequelizeApp,'Sequelize':Sequelize };
export default sequelizeObj;

