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

  async update(data, id) {
  const [affectedRows] = await this.model.update(data, {
    where: { id }
  });

  if (affectedRows === 0) {
    // Either user not found or no data actually changed
    const existing = await this.model.findByPk(id);
    if (!existing) {
      throw new AppError(StatusCodes.NOT_FOUND, ["User not found"]);
    }
    throw new AppError(StatusCodes.BAD_REQUEST, ["No fields were modified"]);
  }

  return await this.model.findByPk(id); // return updated user
}
}




module.exports = CrudRepository