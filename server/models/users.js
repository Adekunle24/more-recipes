
const User = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
    emailConfirmed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0 },
    password: { type: DataTypes.STRING, allowNull: false, validate: { len: [6, 100] } },
    phoneNumber: { type: DataTypes.STRING, allowNull: true },
    phoneNumberVerified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0 },
    accessFailedCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    username: { type: DataTypes.STRING, allowNull: false, validate: { len: [5, 50] } },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
    id: {
      type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    }
  });
  user.associate = (models) => {
    // user.hasOne(models.users_profile, {
    //   foreignKey: 'id'
    // });
    user.hasMany(models.recipes, {
      foreignKey: 'id'
    });
    user.hasMany(models.votes, {
      foreignKey: 'id'
    });
  };
  return user;
};
export default User;
