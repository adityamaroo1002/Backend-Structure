'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Office, {
        foreignKey: "cityId"
      })
    }
  }
  City.init({
    cityName:{
       type: DataTypes.STRING,
       allowNull: false,
       unique: true
      }
  }, {
    sequelize,
    modelName: 'City',
  });

  City.sync({ alter: false}); // Safer: Updates the table to match the model

  return City;
};