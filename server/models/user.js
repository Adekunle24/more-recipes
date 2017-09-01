import Sequelize from 'sequelize';
import sequelize from '../config';

const user = sequelize.define('users',{
  email : { type : Sequelize.STRING, allowNull: false,  validate: { isEmail : true } },
  emailConfirmed : { type : Sequelize.INTEGER, allowNull : false, defaultValue : 0 },
  password : { type : Sequelize.STRING, allowNull : false, validate : { len: [6,100] } },
  phoneNumber : { type : Sequelize.STRING, allowNull : true },
  phoneNumberVerified : { type : Sequelize.INTEGER, allowNull : false, defaultValue : 0 },
  accessFailedCount : { type : Sequelize.INTEGER, allowNull : false, defaultValue : 0 },
  username : { type : Sequelize.STRING, allowNull : false, validate : {   len: [5,50] } },
  createdAt : { type : Sequelize.DATE, allowNull : false },
  updatedAt : { type : Sequelize.DATE, allowNull : false }
});

export default  user;
