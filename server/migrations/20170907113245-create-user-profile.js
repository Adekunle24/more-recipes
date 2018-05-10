module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('user_profiles', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      birthDay: {
        allowNull: true,
        type: Sequelize.DATE
      },
      gender: {
        allowNull: false,
        defaultValue: 'Female',
        type: Sequelize.ENUM('Male', 'Female')
      },
      profilePicture: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface =>
    queryInterface.dropTable('users_profile', {
      force: true,
      cascade: false
    }),
};
