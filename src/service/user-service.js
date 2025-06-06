const  UserRepository  = require('../Repository/userRepository');
const { Logger } = require("../config/index");
const user = require('../models/user');

const userRepository = new UserRepository();

const userCreate = async (data) => {
  try {
    const userResponse = await userRepository.create(data);
    return userResponse;
  } catch (error) {
    Logger.error("Went some thing woring");
    throw error;
  }
};

const getUserDetail = async()=> {
  try{
     return await userRepository.getAll();
  }
  catch(error){
Logger.error("Went Something wrong");
throw error("Went some thing worse")
  }
}

module.exports = {
  userCreate,
  getUserDetail
};