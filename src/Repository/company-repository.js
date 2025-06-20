const CrudRepository = require('./crud-operation');
const {Company} = require('../models/index');
const { where } = require('sequelize');


class CompanyRepository extends CrudRepository{
  constructor(){
    super(Company);
  }
  async filterCompanyData(filter, sortFilter) {
      const response = await this.model.findAll({
        where: filter,
        order: sortFilter
      });
       return response
  }
  
}

module.exports = CompanyRepository