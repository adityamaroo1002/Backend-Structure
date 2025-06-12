const CrudRepository = require('./crud-operation');
const { City } = require('../models/index');


class UserRepository extends CrudRepository{
  constructor(){
    super(City);
  }
}

module.exports = UserRepository;