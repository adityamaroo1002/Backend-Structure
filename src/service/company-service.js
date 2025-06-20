const CompanyRepository = require('../Repository/company-repository');
const { Logger } = require("../config/index");
const AppError = require('../utils/error/app-error');
const {StatusCodes} = require('http-status-codes');
const {Op} = require('sequelize')


const companyRepo = new CompanyRepository();

const createCompany = async (data) => {
  try {
    const companyResponse = await companyRepo.create(data);
    return companyResponse;
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

const getCompanyDetail = async()=> {
  try{
     return await companyRepo.getAll();
  }
  catch(error){
  Logger.error("Went Something wrong");
   throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, ["SomeThing Interval Error of type cast or something went wrong in the model"]);
  }
}

const getSpecificCompany = async(id)=>{
  try{ 
    return await companyRepo.get(id)
  }
  catch(error){
    if (error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError(error.statusCode, ["This Company not exist in our database"]);
    }
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, ["Some thing went wrong on server side"]);
  }
}

const deleteSpecificCompany = async(id)=>{
  try{ return await companyRepo.delete(id)}
  catch(error){
    if (error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError(error.StatusCodes, ["This Company not exist in our database so no delete action is performed"]);
    }
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, ["Some thing went wrong on server side"]);
  }
}

const updateCompanyData = async (data, id) => {
  try {
    const companyResponse = await companyRepo.update(data, id);
    return companyResponse;
  } catch (error) {
    Logger.error("Error in updateCompanyData: ", error);

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

const filterCompanyData = async(query)=> {
  //experience min and max for job role
  let sortFilter = []
  let customFilter = {}
  if (query.experience){
       [minExperience, maxExperience] = query.experience.split("-")
       customFilter.maxExperience ={
        [Op.between]: [minExperience, ((maxExperience == undefined) ? 5 : maxExperience)]
       }
      //  customFilter.maxExperience = maxExperience; 
  }
  //Roles
  if (query.role){
    role = query.role
    customFilter.roles = role;
  }

  //Company Size
  if (query.size){
    const companySize = query.size;
    customFilter.size = {
      [Op.gte]: companySize
    }
  }

  //Sorting 
  if (query.sort){
    const sort = query.sort.split(",");
    const paramsArray = sort.map((param)=> {
     return param.split("_")
    })
    console.log(paramsArray);
    

    sortFilter = paramsArray

  }

  try{
    let response = await companyRepo.filterCompanyData(customFilter, sortFilter)
    return response
  }
  catch{
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      ["Something internal went wrong in the model"]
    );
  }



}




module.exports = {
  createCompany,
  getCompanyDetail,
  getSpecificCompany,
  deleteSpecificCompany,
  updateCompanyData,
  filterCompanyData
};