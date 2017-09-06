
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import Sequelize from 'sequelize';
import path from 'path';
const basename = path.basename(module.filename);
const db = {};
let sequelizeApp = new Sequelize(`${process.env.DB_NAME}-${process.env.NODE_ENV.toLowerCase()}`,process.env.DB_USERNAME,
   process.env.DB_PASSWORD,{dialect:process.env.DB_DIALECT,host:process.env.DB_HOST});
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