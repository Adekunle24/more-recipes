

import Sequelize from 'sequelize';

const Recipe = (sequelize) => {
  const model = sequelize.define('recipes', {
    title: { type: Sequelize.STRING, allowNull: false },
    createdAt: { type: Sequelize.TIME, allowNull: true },
    mediaId: { type: Sequelize.INTEGER, allowNull: false },
    updatedAt: { type: Sequelize.TIME, allowNull: true },
    userId: { type: Sequelize.INTEGER, allowNull: false },
    procedures: { type: Sequelize.STRING, allowNull: false },
    ingredients: { type: Sequelize.STRING, allowNull: false, defaultValue: '[{}]' }
  });
  return model;
};

export default Recipe;
