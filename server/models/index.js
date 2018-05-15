
import dotenv from 'dotenv';

import fs from 'fs';
import Sequelize from 'sequelize';
import path from 'path';
import UserProfile from './user-profile';
import Media from './media';

dotenv.config();

const basename = path.basename(module.filename);
const db = {};
let sequelizeApp;
if (process.env.NODE_ENV !== 'production') {
  sequelizeApp = new Sequelize(
    `${process.env.DB_NAME}_${process.env.NODE_ENV.toLowerCase()}`, process.env.DB_USERNAME,
    process.env.DB_PASSWORD, { dialect: process.env.DB_DIALECT, host: process.env.DB_HOST }
  );
} else {
  sequelizeApp = new Sequelize(process.env.DATABASE_URL);
}
fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelizeApp.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelizeApp;
db.Sequelize = Sequelize;
export const userProfile = UserProfile(db.sequelize, db.Sequelize);
export const media = Media(db.sequelize);
export default db;
