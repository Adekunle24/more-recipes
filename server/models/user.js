import Config from '../config/config.json';
const config = Config['development'];
import Sequelize from 'sequelize';
const sequelize = new Sequelize(config.database,config.username, config.password,config.options);

const user = sequelize.define('users',{
  email : { type : Sequelize.STRING, allowNull: false},
  emailConfirmed : { type : Sequelize.INTEGER, allowNull : false, defaultValue : 0 },
  passwordHash : { type : Sequelize.STRING, allowNull : false },
  phoneNumber : { type : Sequelize.STRING, allowNull : true },
  phoneNumberVerified : { type : Sequelize.INTEGER, allowNull : false, defaultValue : 0 },
  accessFailedCount : { type : Sequelize.INTEGER, allowNull : false, defaultValue : 0 },
  username : { type : Sequelize.STRING, allowNull : false},
  createdAt : { type : Sequelize.DATE, allowNull : false, defaultValue : new Date() },
  updatedAt : { type : Sequelize.DATE, allowNull : false, defaultValue : new Date() }
});

export default  user;
