'use strict';
module.exports = function(sequelize, DataTypes) {
  var reviews = sequelize.define('reviews', {
    id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return reviews;
};