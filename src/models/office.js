'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Office extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City, {
        foreignKey: 'cityId',
      });
      this.hasMany(models.Company, {
        foreignKey: "officeId"
      })
      
    }
  }
  Office.init({
    officeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
     type: DataTypes.STRING,
     allowNull: false
    },
    pinCode: {
     type: DataTypes.STRING,
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Office',
  });

   Office.sync({alter: false}); // Safer: Updates the table to match the model
  return Office;
};