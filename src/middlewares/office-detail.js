const {StatusCodes} = require('http-status-codes')
const {ErrorResponse} = require('../utils/common')
const AppError = require('../utils/error/app-error');


const validationCreate = (req, res, next)=> {
  if (!req.body.officeName || req.body.officeName === "" ){
    ErrorResponse.message = "Office Data is not saved something went wrong"
    ErrorResponse.error =  new AppError(StatusCodes.BAD_REQUEST,  ["Office name is not inputed or empty input"])
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.address || req.body.address === "" ){
    ErrorResponse.message = "Office Data is not saved something went wrong"
    ErrorResponse.error =  new AppError(StatusCodes.BAD_REQUEST,  ["Office address is not inputed or empty input"])
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.pinCode || req.body.pinCode === "" ){
    ErrorResponse.message = "Office Data is not saved something went wrong"
    ErrorResponse.error =  new AppError(StatusCodes.BAD_REQUEST,  ["Office PinCode is not inputed or empty input"])
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.cityId){
     ErrorResponse.message = "Office Data is not saved something went wrong"
    ErrorResponse.error =  new AppError(StatusCodes.BAD_REQUEST,  ["Office City Id is not inputed or empty input"])
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
 }

 module.exports = {
  validationCreate
 }