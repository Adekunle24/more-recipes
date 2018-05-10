

const UserProfile = (sequelize, DataTypes) => {
  const profile = sequelize.define('user_profiles', {
    firstName: { type: DataTypes.STRING, allowNull: true },
    lastName: { type: DataTypes.STRING, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
    birthDay: { type: DataTypes.DATE, allowNull: true },
    gender: { type: DataTypes.ENUM('Male', 'Female'), allowNull: true },
    profilePicture: { type: DataTypes.STRING, allowNull: true },
    userId: {
      type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    }
  });
  profile.associate = (models) => {
    profile.belongsTo(models.users, {
      foreignKey: 'userId',
    });
  };
  return profile;
};
export default UserProfile;
