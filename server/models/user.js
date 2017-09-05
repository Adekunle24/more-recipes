
const User = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    email : { type : DataTypes.STRING, allowNull: false,  validate: { isEmail : true } },
    emailConfirmed : { type : DataTypes.INTEGER, allowNull : false, defaultValue : 0 },
    password : { type : DataTypes.STRING, allowNull : false, validate : { len: [6,100] } },
    phoneNumber : { type : DataTypes.STRING, allowNull : true },
    phoneNumberVerified : { type : DataTypes.INTEGER, allowNull : false, defaultValue : 0 },
    accessFailedCount : { type : DataTypes.INTEGER, allowNull : false, defaultValue : 0 },
    username : { type : DataTypes.STRING, allowNull : false, validate : {   len: [5,50] } },
    createdAt : { type : DataTypes.DATE, allowNull : false },
    updatedAt : { type : DataTypes.DATE, allowNull : false },
    id : { type : DataTypes.INTEGER, allowNull : false, primaryKey : true, autoIncrement: true }
  });
  user.associate = (models) => {
    user.hasMany(models.recipes, {
      foreignKey: 'id',
      onDelete: 'cascade', hooks: true
    });
  };
  return user;
};
export default User;