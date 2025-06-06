const {UserController} = require('../../controller/index');
const express = require('express');
const router = express.Router();

router.post('/create_user', UserController.createUserController);
router.get('/get_user',UserController.getUsers);

module.exports = router;