const CrudRepository = require('./crud-operation');
const db = require('../models/index');
const { Model } = require('sequelize');
const User = db.User

class UserRepository extends CrudRepository{
  constructor(){
    super(User);
  }
}

module.exports = UserRepository;