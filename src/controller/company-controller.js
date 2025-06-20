const {CompanyService} = require('../service/index');
const statusCode = require('http-status-codes');
const {Logger} = require('../config/logger');
const { error } = require('winston');

const {SuccessResponse, ErrorResponse} = require('../utils/common/index')

const createCompanyController = async (req, res) => {
  //console.log(req,"Checking.....");
  
  try {
    // Logger.info("Running create Aeroplane");
    console.log(req.body.name)
    console.log(req.body.info)
    const companyData = await CompanyService.createCompany({
      info: req.body.info,
      roles: req.body.roles,
      openings: req.body.openings,
      name: req.body.name,
      officeId: req.body.officeId,
      size: req.body.size,
      minExperience: req.body.minExperience,
      maxExperience: req.body.maxExperience,
      
    });
    SuccessResponse.data = companyData
    return res.status(statusCode.CREATED).json(SuccessResponse);
  } catch (error) {
    // Logger.info("Not workinng create User");
    ErrorResponse.message = "Some internal server"
    ErrorResponse.error = error
    console.log(error)
    return res.status(error.statusCode).json(ErrorResponse);
  }
  
};

const getCompanyDetail = async(req,res) => {
  try{
  const companyData = await CompanyService.getCompanyDetail();
  SuccessResponse.data = companyData;
  SuccessResponse.message = "All data has been fecthed succesfully"
  return res.status(statusCode.OK).json(SuccessResponse)
  }

  catch(error){
    ErrorResponse.error = error
   return res.status(error.status).json(ErrorResponse)
  }
}

const getSpecificCompany = async(req,res) => {
  try{
    const id = req.params.id
    console.log(id);
  const companyData = await CompanyService.getSpecificCompany(id);
  SuccessResponse.data = companyData;
  SuccessResponse.message = "All Company has been fecthed succesfully"
  return res.status(statusCode.OK).json(SuccessResponse)
  }

  catch(error){
    ErrorResponse.error = error
   return res
   .status(error.statusCode).
   json(ErrorResponse)
  }
}

const deleteSpecificCompany = async(req,res) => {
  try{
    const id = req.params.id
    console.log(id);
  const companyData = await CompanyService.deleteSpecificCompany(id);
  SuccessResponse.data = companyData;
  SuccessResponse.message = "All Company has been fecthed succesfully"
  return res.status(statusCode.OK).json(SuccessResponse)
  }

  catch(error){
    ErrorResponse.error = error
   return res
   .status(error.statusCode)
   .json(ErrorResponse)
  }
};

const updateCompanyDetail = async (req, res) => {
  //console.log(req,"Checking.....");
  
  try {
    // Logger.info("Running create Aeroplane");
    const companyData = await CompanyService.updateCompanyData({
     info: req.body.info,
      roles: req.body.roles,
      openings: req.body.openings,
      name: req.body.name,
      officeId: req.body.officeId,
      size: req.body.size
    }, req.params.id);
    SuccessResponse.data = companyData
    return res.status(statusCode.OK).json(SuccessResponse);
  } catch (error) {
    // Logger.info("Not workinng create User");
    ErrorResponse.message = "Some internal server"
    ErrorResponse.error = error
    console.log(error)
    return res.status(error.statusCode).json(ErrorResponse);
  }
  
};

const filterCompanyData = async(req, res)=>{
  try{
const companyData = await CompanyService.filterCompanyData(req.query);
SuccessResponse.data = companyData;
return res
.status(statusCode.StatusCodes.OK)
.json(SuccessResponse);  
  }
  catch (error) {
    // Logger.info("Not workinng create User");
    ErrorResponse.message = "Some internal server"
    ErrorResponse.error = error
    console.log(error)
    return res.status(error.statusCode).json(ErrorResponse);
  }
}


module.exports = {
  createCompanyController,
  getCompanyDetail,
  getSpecificCompany,
  deleteSpecificCompany,
  updateCompanyDetail,
  filterCompanyData
}