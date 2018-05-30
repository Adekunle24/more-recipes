
import Sequelize from 'sequelize';


const UserProfile = sequelize => sequelize.define('user_profiles', {
  firstName: { type: Sequelize.STRING, allowNull: true },
  lastName: { type: Sequelize.STRING, allowNull: true },
  createdAt: { type: Sequelize.DATE, allowNull: false },
  updatedAt: { type: Sequelize.DATE, allowNull: false },
  birthDay: { type: Sequelize.DATE, allowNull: true },
  gender: { type: Sequelize.ENUM('Male', 'Female'), allowNull: true },
  profilePicture: { type: Sequelize.STRING, allowNull: true },
  userId: {
    type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true
  }
});


export default UserProfile;
