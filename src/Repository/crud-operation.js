const { error } = require('winston')
const {Logger} = require('../config/index')
const { where } = require('sequelize')
const AppError = require('../utils/error/app-error')
const { StatusCodes } = require('http-status-codes')

class CrudRepository{
  constructor(model){
    this.model = model
  }
  async create(data){
    // try{
      const response = await this.model.create(data)
      return response
    // }
    // catch(error){
    //   Logger.error("Something went wrong repository: create function")
    //   throw error;
    // }
  }

   async delete(data){
    // try{
      const response = await this.model.destroy({
        where: {
          id: data
        }
      })
      if (!response){
        Logger.error("No user Data found")
        return new AppError(StatusCodes.NOT_FOUND, ["Not Found data in database"])
      }
      return response
    // }
    // catch(error){
    //   Logger.error("Something went wrong repository: delete function")
    //   throw error;
    // }
  }

  async get(data){
    // try{
      const response = await this.model.findByPk(data)
      if (!response){
        Logger.error("No user Data found")
         throw new AppError(StatusCodes.NOT_FOUND, ["Not Found data in database"])
      }
       return response
    // }
    // catch(error){
    //   Logger.error("Something went wrong repository: delete function")
    //   throw error;
    // }
  }

  async getAll(){
    // try{
      const response = await this.model.findAll();
       return response
    // }
    // catch(error){
    //   Logger.error("Something went wrong repository: delete function")
    //   throw error;
    // }
  }

  async update(data, id){
    // try{
      const response = await this.model.update(data,{
        where: {
          id: id
        }
      });
       
    // }
    // catch(error){
    //   Logger.error("Something went wrong repository: delete function")
    //   throw error;
    // }
  }

}

module.exports = CrudRepository