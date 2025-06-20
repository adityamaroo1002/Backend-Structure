const {StatusCodes} = require('http-status-codes')
const {ErrorResponse} = require('../utils/common')
const AppError = require('../utils/error/app-error');


const validationCreate = (req, res, next)=> {
  if (!req.body.name || req.body.name.trim() === "" ){
    ErrorResponse.message = "Comapny Data is not saved something went wrong"
    ErrorResponse.error =  new AppError(StatusCodes.BAD_REQUEST,  ["Office name is not inputed or empty input"])
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.info || req.body.info.trim() === "" ){
    ErrorResponse.message = "Comapny Data is not saved something went wrong"
    ErrorResponse.error =  new AppError(StatusCodes.BAD_REQUEST,  ["Office address is not inputed or empty input"])
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.roles || req.body.roles.trim() === "" ){
    ErrorResponse.message = "Comapny Data is not saved something went wrong"
    ErrorResponse.error =  new AppError(StatusCodes.BAD_REQUEST,  ["Office PinCode is not inputed or empty input"])
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.officeId){
     ErrorResponse.message = "Comapny Data is not saved something went wrong"
    ErrorResponse.error =  new AppError(StatusCodes.BAD_REQUEST,  ["Office City Id is not inputed or empty input"])
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
 }

 module.exports = {
  validationCreate
 }