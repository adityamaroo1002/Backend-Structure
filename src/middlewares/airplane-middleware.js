const {StatusCodes} = require('http-status-codes')
const {ErrorResponse} = require('../utils/common')
const validationCreate = (req, res, next)=> {
  if (!req.body.name || req.body.name === "" || !req.body.userId ){
    ErrorResponse.message = "User Data is not saved something went wrong"
    ErrorResponse.error = {explanation: "Name and userId is not inputed or empty input"}
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
 }

 module.exports = {
  validationCreate
 }