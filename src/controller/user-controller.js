const {UserService} = require('../service/index');
const statusCode = require('http-status-codes');
const {Logger} = require('../config/logger');
const { error } = require('winston');

const {SuccessResponse, ErrorResponse} = require('../utils/common/index')

const createUserController = async (req, res) => {
  //console.log(req,"Checking.....");
  
  try {
    // Logger.info("Running create Aeroplane");
    console.log(req.body.name)
    console.log(req.body.userId)
    const userData = await UserService.userCreate({
      name: req.body.name,
      userId: req.body.userId,
      gender: req.body.gender,
      fatherName: req.body.fatherName
    });
    SuccessResponse.data = userData
    return res.status(statusCode.CREATED).json(SuccessResponse);
  } catch (error) {
    // Logger.info("Not workinng create User");
    ErrorResponse.message = "Some internal server"
    ErrorResponse.error = error
    console.log(error)
    return res.status(error.statusCode).json(ErrorResponse);
  }
  
};


const getUsers = async(req,res) => {
  try{
  const userData = await UserService.getUserDetail();
  SuccessResponse.data = userData;
  SuccessResponse.message = "All data has been fecthed succesfully"
  return res.status(statusCode.OK).json(SuccessResponse)
  }

  catch(error){
    ErrorResponse.error = error
   return res.status(error.status).json(ErrorResponse)
  }
}

const getSpecificUser = async(req,res) => {
  try{
    const id = req.params.id
    console.log(id);
  const userData = await UserService.getSpecificUser(id);
  SuccessResponse.data = userData;
  SuccessResponse.message = "All User has been fecthed succesfully"
  return res.status(statusCode.OK).json(SuccessResponse)
  }

  catch(error){
    ErrorResponse.error = error
   return res
   .status(error.statusCode).
   json(ErrorResponse)
  }
}

const deleteSpecificUser = async(req,res) => {
  try{
    const id = req.params.id
    console.log(id);
  const userData = await UserService.deleteSpecificUser(id);
  SuccessResponse.data = userData;
  SuccessResponse.message = "All User has been fecthed succesfully"
  return res.status(statusCode.OK).json(SuccessResponse)
  }

  catch(error){
    ErrorResponse.error = error
   return res
   .status(error.statusCode)
   .json(ErrorResponse)
  }
}


module.exports = {
  createUserController,
  getUsers,
  getSpecificUser,
  deleteSpecificUser
}