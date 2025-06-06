const { error } = require('winston')
const {Logger} = require('../config/index')
const { where } = require('sequelize')

class CrudRepository{
  constructor(model){
    this.model = model
  }
  async create(data){
    try{
      const response = await this.model.create(data)
      return response
    }
    catch(error){
      Logger.error("Something went wrong repository: create function")
      throw error;
    }
  }

   async delete(data){
    try{
      const response = await this.model.destroy({
        where: {
          id: data
        }
      })
      return response
    }
    catch(error){
      Logger.error("Something went wrong repository: delete function")
      throw error;
    }
  }

  async get(data){
    try{
      const response = await this.model.findByPk(data)
       return response
    }
    catch(error){
      Logger.error("Something went wrong repository: delete function")
      throw error;
    }
  }

  async getAll(){
    try{
      const response = await this.model.findAll();
       return response
    }
    catch(error){
      Logger.error("Something went wrong repository: delete function")
      throw error;
    }
  }

  async update(data, id){
    try{
      const response = await this.model.update(data,{
        where: {
          id: id
        }
      });
       
    }
    catch(error){
      Logger.error("Something went wrong repository: delete function")
      throw error;
    }
  }

}

module.exports = CrudRepository