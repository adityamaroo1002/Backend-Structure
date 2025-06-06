const {UserService} = require('../service/index');
const statusCode = require('http-status-codes');
const {Logger} = require('../config/logger');
const { error } = require('winston');

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
    return res.status(statusCode.CREATED).json({
      success: true,
      message: "User Created succesfully",
      data: userData,
      error: {},
    });
  } catch (error) {
    // Logger.info("Not workinng create User");
    console.log(error)
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Some internal server",
      data: {},
      error: error,
    });
  }
  
};


const getUsers = async(req,res) => {
  try{
  const userData = await UserService.getUserDetail();
  return res.status(statusCode.OK).json({
    success: true,
    message: "All Data Fetch",
    data: userData,
    error: {}
  })
  }

  catch(error){
   return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      sucess: true,
      message: "Api sgdfdg fine state",
      data: {},
      error: error
    })
  }
}

module.exports = {
  createUserController,
  getUsers
}