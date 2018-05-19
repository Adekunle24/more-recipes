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
    }).then(() => {
      queryInterface.addConstraint('user_profiles', ['userId'], {
        type: 'foreign key',
        name: 'user_fkey_constraint_name',
        references: {
          table: 'users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    });
  },
  down: queryInterface =>
    queryInterface.dropTable('user_profiles', {
      force: true,
      cascade: false
    }),
};
