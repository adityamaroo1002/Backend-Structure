const {StatusCodes} = require('http-status-codes')
const {ErrorResponse} = require('../utils/common')
const AppError = require('../utils/error/app-error');


const validationCreate = (req, res, next)=> {
  if (!req.body.name || req.body.name === "" || !req.body.userId ){
    ErrorResponse.message = "User Data is not saved something went wrong"
    ErrorResponse.error =  new AppError(StatusCodes.BAD_REQUEST,  ["Name and userId is not inputed or empty input"])
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
 }

 module.exports = {
  validationCreate
 }