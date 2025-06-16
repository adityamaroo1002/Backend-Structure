const OfficeRepository = require('../Repository/office-repository');
const { Logger } = require("../config/index");
const AppError = require('../utils/error/app-error');
const {StatusCodes} = require('http-status-codes');


const officeRepo = new OfficeRepository();

const officeCreate = async (data) => {
  try {
    const officeResponse = await officeRepo.create(data);
    return officeResponse;
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

const getOfficeDetail = async()=> {
  try{
     return await officeRepo.getAll();
  }
  catch(error){
  Logger.error("Went Something wrong");
   throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, ["SomeThing Interval Error of type cast or something went wrong in the model"]);
  }
}

const getSpecificOffice = async(id)=>{
  try{ 
    return await officeRepo.get(id)
  }
  catch(error){
    if (error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError(error.statusCode, ["This office not exist in our database"]);
    }
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, ["Some thing went wrong on server side"]);
  }
}

const deleteSpecificOffice = async(id)=>{
  try{ return await officeRepo.delete(id)}
  catch(error){
    if (error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError(error.StatusCodes, ["This Office not exist in our database so no delete action is performed"]);
    }
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, ["Some thing went wrong on server side"]);
  }
}

const updateOfficeData = async (data, id) => {
  try {
    const officeResponse = await officeRepo.update(data, id);
    return officeResponse;
  } catch (error) {
    Logger.error("Error in updateofficeData: ", error);

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
  officeCreate,
  getOfficeDetail,
  getSpecificOffice,
  deleteSpecificOffice,
  updateOfficeData
};