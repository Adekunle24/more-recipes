
import Sequelize from 'sequelize';

const User = (sequelize) => {
  const model = sequelize.define('users', {
    email: { type: Sequelize.STRING, allowNull: false, validate: { isEmail: true } },
    emailConfirmed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0 },
    password: { type: Sequelize.STRING, allowNull: false, validate: { len: [6, 100] } },
    phoneNumber: { type: Sequelize.STRING, allowNull: true },
    phoneNumberVerified: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0 },
    accessFailedCount: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    username: { type: Sequelize.STRING, allowNull: false, validate: { len: [5, 50] } },
    createdAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false },
    id: {
      type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
    }
  });

  return model;
};

export default User;
