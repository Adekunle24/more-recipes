'use strict';
module.exports = function(sequelize, DataTypes) {
  var social - values = sequelize.define('social-values', {
    id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return social - values;
};