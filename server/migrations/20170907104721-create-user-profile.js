
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('users-profile', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
         onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
          as: 'user'
        }
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
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
    queryInterface.dropTable('users-profile',{
        force: true,
        cascade: false}),
};