const {StatusCodes} = require('http-status-codes')
const {ErrorResponse} = require('../utils/common')
const AppError = require('../utils/error/app-error');


const validationCreate = (req, res, next)=> {
  if (!req.body.cityName || req.body.cityName === "" ){
    ErrorResponse.message = "User Data is not saved something went wrong"
    ErrorResponse.error =  new AppError(StatusCodes.BAD_REQUEST,  ["City name is not inputed or empty input"])
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
 }

 module.exports = {
  validationCreate
 }