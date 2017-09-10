'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var UserProfile = function UserProfile(sequelize, DataTypes) {
  var profile = sequelize.define('users_profile', {
    firstName: { type: DataTypes.STRING, allowNull: true },
    lastName: { type: DataTypes.STRING, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
    profilePicture: { type: DataTypes.STRING, allowNull: true },
    userId: {
      type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    }
  });
  profile.associate = function (models) {
    profile.belongsTo(models.users, {
      foreignKey: 'userId'
    });
  };
  return profile;
};
exports.default = UserProfile;