
import env from 'dotenv';
env.config();
import fs from 'fs';
import Sequelize from 'sequelize';
import path from 'path';
const basename = path.basename(module.filename);
const db = {};
const envData = process.env.NODE_ENV || 'production';
let sequelizeApp;

if(envData==='production')
{
  sequelizeApp = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME, process.env.DB_PASSWORD,{dialect:process.env.DB_DIALECT,host:process.env.DB_HOST});
}
else if(envData==='test'){
   sequelizeApp = new Sequelize(process.env.DB_NAME_TEST,process.env.DB_USERNAME, process.env.DB_PASSWORD,{dialect:process.env.DB_DIALECT,host:process.env.DB_HOST});
}
else {
  sequelizeApp = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME, process.env.DB_PASSWORD,{dialect:process.env.DB_DIALECT,host:process.env.DB_HOST});
}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelizeApp.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelizeApp;
db.Sequelize = Sequelize;
export default db;
