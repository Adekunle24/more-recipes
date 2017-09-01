// import user from './user';
// import recipe from './recipe';
// import review from './review';
// import favouriteRecipe from './favouriteRecipe';
// const allModels = { 'user' : user , 'recipe' : recipe, 'review' : review, 'favouriteRecipe': favouriteRecipe };


import env from 'dotenv';
env.config();
import fs from 'fs';
import Sequelize from 'sequelize';
import config from '../config/config.json';
import path from 'path';
const basename = path.basename(module.filename);
const db = {};
const envData = process.env.NODE_ENV || 'production';
let sequelizeApp;

if(envData==='production')
{
  sequelizeApp = new Sequelize(envData.DB_NAME,envData.DB_USERNAME,envData.DB_PASSWORD,{'dialect':envData.DIALECT,'host':envData.HOST });
}
else{
  const configData = config[envData];
  sequelizeApp = new Sequelize(configData.database,configData.username, configData.password,configData.options);
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
//const sequelizedUserModel =  sequelizeApp.import('../models/user.js');
//const sequelizedRecipeModel = sequelizeApp.import('../models/recipe.js');
// const sequelizeObj = { 'sequelizeApp':sequelizeApp,'Sequelize':Sequelize
// };
// export default sequelizeObj;


// export default allModels;
export default db;
