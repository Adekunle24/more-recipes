
const UserProfile = (sequelize, DataTypes) => {
  const profile = sequelize.define('users_profile', {
    firstName: { type: DataTypes.STRING, allowNull: true },
    lastName: { type: DataTypes.STRING, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
    profilePicture: { type: DataTypes.STRING, allowNull: true },
    userId: {
      type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    }
  });
  profile.associate = (models) => {
    profile.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete : 'CASCADE'
    });
  };
  return profile;
};
export default UserProfile;