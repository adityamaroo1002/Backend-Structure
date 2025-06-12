const { log } = require('winston');
const  CityRepository = require('../Repository/city-repository');
const { Logger } = require("../config/index");
const AppError = require('../utils/error/app-error');
const {StatusCodes} = require('http-status-codes');


const cityRepo = new CityRepository();

const cityCreate = async (data) => {
  try {
    const cityResponse = await cityRepo.create(data);
    return cityResponse;
  } catch (error) {
    Logger.error("Went some thing woring");
    console.log(error);
    
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      console.log(explanation);
      throw new AppError(StatusCodes.BAD_REQUEST, explanation);
    }

    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, ["SomeThing Interval Error of type cast or something went wrong in the model"]);
  }
};

const getCityDetail = async()=> {
  try{
     return await cityRepo.getAll();
  }
  catch(error){
  Logger.error("Went Something wrong");
   throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, ["SomeThing Interval Error of type cast or something went wrong in the model"]);
  }
}

const getSpecificCity = async(id)=>{
  try{ 
    return await cityRepo.get(id)
  }
  catch(error){
    if (error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError(error.statusCode, ["This city not exist in our database"]);
    }
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, ["Some thing went wrong on server side"]);
  }
}

const deleteSpecificCity = async(id)=>{
  try{ return await cityRepo.delete(id)}
  catch(error){
    if (error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError(error.StatusCodes, ["This city not exist in our database so no delete action is performed"]);
    }
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, ["Some thing went wrong on server side"]);
  }
}

const updateCityData = async (data, id) => {
  try {
    const cityResponse = await cityRepo.update(data, id);
    return cityResponse;
  } catch (error) {
    Logger.error("Error in updatecityData: ", error);

    if (error instanceof AppError) {
      // Re-throw AppErrors as they are
      throw error;
    }

    // Sequelize validation
    if (error.name === 'SequelizeValidationError') {
      const explanation = error.errors.map(err => err.message);
      throw new AppError(StatusCodes.BAD_REQUEST, explanation);
    }

    // Anything else: internal server error
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      ["Something internal went wrong in the model"]
    );
  }
};




module.exports = {
  cityCreate,
  getCityDetail,
  getSpecificCity,
  deleteSpecificCity,
  updateCityData
};