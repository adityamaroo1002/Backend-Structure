const  UserRepository  = require('../Repository/userRepository');
const { Logger } = require("../config/index");
const user = require('../models/user');
const AppError = require('../utils/error/app-error');
const userRepository = new UserRepository();
const {StatusCodes} = require('http-status-codes');

const userCreate = async (data) => {
  try {
    const userResponse = await userRepository.create(data);
    return userResponse;
  } catch (error) {
    Logger.error("Went some thing woring");
    if (error.name == 'SequelizeValidationError'){
      let explanation = [];
      error.errors.array.forEach((err) => {
        explanation.push(err.message);
      });
      console.log(explanation);
      throw new AppError(StatusCodes.BAD_REQUEST, explanation)
    }
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, ["SomeThing Interval Error of type cast or something went wrong in the model"]);
  }
};

const getUserDetail = async()=> {
  try{
     return await userRepository.getAll();
  }
  catch(error){
  Logger.error("Went Something wrong");
   throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, ["SomeThing Interval Error of type cast or something went wrong in the model"]);
  }
}

const getSpecificUser = async(id)=>{
  try{ 
    return await userRepository.get(id)
  }
  catch(error){
    if (error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError(error.statusCode, ["This User not exist in our database"]);
    }
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, ["Some thing went wrong on server side"]);
  }
}

const deleteSpecificUser = async(id)=>{
  try{ return await userRepository.delete(id)}
  catch(error){
    if (error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError(error.StatusCodes, ["This User not exist in our database so no delete action is performed"]);
    }
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, ["Some thing went wrong on server side"]);
  }
}

module.exports = {
  userCreate,
  getUserDetail,
  getSpecificUser,
  deleteSpecificUser
};