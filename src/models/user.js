'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    userId: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    fatherName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  sequelize.sync({ alter: false }); // Safer: Updates the table to match the model
  return User;
};