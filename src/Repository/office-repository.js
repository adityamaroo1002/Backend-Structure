const { Office } = require('../models/index');
// const office = require('../models/office');
const CrudRepository = require('./crud-operation');

class OfficeRepository extends CrudRepository{
  constructor(){
    super(Office);
  }
}

module.exports = OfficeRepository