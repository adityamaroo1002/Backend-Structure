'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Office,{
        foreignKey: "officeId"
      })

    }
  }
  Company.init({
    info: {
      type: DataTypes.STRING,
      allowNull : false,
    },
    roles: {
      type: DataTypes.STRING,
      allowNull: true
    },
    openings: {
     type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
    ,
    officeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    size: DataTypes.INTEGER,
    minExperience: DataTypes.INTEGER,
    maxExperience: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Company',
  });
  Company.sync({alter: true})
  return Company;
};