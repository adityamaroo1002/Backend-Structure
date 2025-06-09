const {UserController} = require('../../controller/index');
const express = require('express');
const router = express.Router();
const {UserMiddleWare} = require('../../middlewares/index')

router.post('/create_user',UserMiddleWare.validationCreate, UserController.createUserController);
router.get('/get_user',UserController.getUsers);

module.exports = router;