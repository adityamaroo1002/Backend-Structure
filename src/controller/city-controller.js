const {CityService} = require('../service/index');
const statusCode = require('http-status-codes');
const {Logger} = require('../config/logger');
const { error } = require('winston');

const {SuccessResponse, ErrorResponse} = require('../utils/common/index')

const createCityController = async (req, res) => {
  //console.log(req,"Checking.....");
  
  try {
    // Logger.info("Running create Aeroplane");
    console.log(req.body.name)
    console.log(req.body.userId)
    const cityData = await CityService.cityCreate({
      cityName: req.body.cityName
      
    });
    SuccessResponse.data = cityData
    return res.status(statusCode.CREATED).json(SuccessResponse);
  } catch (error) {
    // Logger.info("Not workinng create User");
    ErrorResponse.message = "Some internal server"
    ErrorResponse.error = error
    console.log(error)
    return res.status(error.statusCode).json(ErrorResponse);
  }
  
};


const getCities = async(req,res) => {
  try{
  const cityData = await CityService.getCityDetail();
  SuccessResponse.data = cityData;
  SuccessResponse.message = "All data has been fecthed succesfully"
  return res.status(statusCode.OK).json(SuccessResponse)
  }

  catch(error){
    ErrorResponse.error = error
   return res.status(error.status).json(ErrorResponse)
  }
}

const getSpecificCity = async(req,res) => {
  try{
    const id = req.params.id
    console.log(id);
  const cityData = await CityService.getSpecificCity(id);
  SuccessResponse.data = cityData;
  SuccessResponse.message = "All City has been fecthed succesfully"
  return res.status(statusCode.OK).json(SuccessResponse)
  }

  catch(error){
    ErrorResponse.error = error
   return res
   .status(error.statusCode).
   json(ErrorResponse)
  }
}

const deleteSpecificCity = async(req,res) => {
  try{
    const id = req.params.id
    console.log(id);
  const cityData = await CityService.deleteSpecificCity(id);
  SuccessResponse.data = cityData;
  SuccessResponse.message = "All City has been fecthed succesfully"
  return res.status(statusCode.OK).json(SuccessResponse)
  }

  catch(error){
    ErrorResponse.error = error
   return res
   .status(error.statusCode)
   .json(ErrorResponse)
  }
};

const updateCityDetail = async (req, res) => {
  //console.log(req,"Checking.....");
  
  try {
    // Logger.info("Running create Aeroplane");
    const cityData = await CityService.updateCityData({
     cityName: req.body.cityName
    }, req.params.id);
    SuccessResponse.data = cityData
    return res.status(statusCode.OK).json(SuccessResponse);
  } catch (error) {
    // Logger.info("Not workinng create User");
    ErrorResponse.message = "Some internal server"
    ErrorResponse.error = error
    console.log(error)
    return res.status(error.statusCode).json(ErrorResponse);
  }
  
};


module.exports = {
  createCityController,
  getCities,
  getSpecificCity,
  deleteSpecificCity,
  updateCityDetail
}