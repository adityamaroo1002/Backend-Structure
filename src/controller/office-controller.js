const {OfficeService} = require('../service/index');
const statusCode = require('http-status-codes');
const {Logger} = require('../config/logger');
const { error } = require('winston');

const {SuccessResponse, ErrorResponse} = require('../utils/common/index')

const createOfficeController = async (req, res) => {
  //console.log(req,"Checking.....");
  
  try {
    // Logger.info("Running create Aeroplane");
    console.log(req.body.officeName)
    console.log(req.body.address)
    const officeData = await OfficeService.officeCreate({
      officeName: req.body.officeName,
      address: req.body.address,
      pinCode: req.body.pinCode,
      cityId: req.body.cityId
      
    });
    SuccessResponse.data = officeData
    return res.status(statusCode.CREATED).json(SuccessResponse);
  } catch (error) {
    // Logger.info("Not workinng create User");
    ErrorResponse.message = "Some internal server"
    ErrorResponse.error = error
    console.log(error)
    return res.status(error.statusCode).json(ErrorResponse);
  }
  
};

const getOfficeDetail = async(req,res) => {
  try{
  const officeData = await OfficeService.getOfficeDetail();
  SuccessResponse.data = officeData;
  SuccessResponse.message = "All data has been fecthed succesfully"
  return res.status(statusCode.OK).json(SuccessResponse)
  }

  catch(error){
    ErrorResponse.error = error
   return res.status(error.status).json(ErrorResponse)
  }
}

const getSpecificOffice = async(req,res) => {
  try{
    const id = req.params.id
    console.log(id);
  const officeData = await OfficeService.getSpecificOffice(id);
  SuccessResponse.data = officeData;
  SuccessResponse.message = "All office has been fecthed succesfully"
  return res.status(statusCode.OK).json(SuccessResponse)
  }

  catch(error){
    ErrorResponse.error = error
   return res
   .status(error.statusCode).
   json(ErrorResponse)
  }
}

const deleteSpecificOffice = async(req,res) => {
  try{
    const id = req.params.id
    console.log(id);
  const officeData = await OfficeService.deleteSpecificOffice(id);
  SuccessResponse.data = officeData;
  SuccessResponse.message = "All office has been fecthed succesfully"
  return res.status(statusCode.OK).json(SuccessResponse)
  }

  catch(error){
    ErrorResponse.error = error
   return res
   .status(error.statusCode)
   .json(ErrorResponse)
  }
};

const updateOfficeDetail = async (req, res) => {
  //console.log(req,"Checking.....");
  
  try {
    // Logger.info("Running create Aeroplane");
    const officeData = await OfficeService.updateOfficeData({
      officeName: req.body.officeName,
      address: req.body.address,
      pinCode: req.body.pinCode,
      cityId: req.body.cityId
    }, req.params.id);
    SuccessResponse.data = officeData
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
  createOfficeController,
  getOfficeDetail,
  getSpecificOffice,
  deleteSpecificOffice,
  updateOfficeDetail
}