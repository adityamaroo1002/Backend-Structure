const express = require('express');
const  {InfoController} = require('../../controller/index.js');
const { info } = require('winston');

const router = express.Router();

router.get('/', InfoController.info);

module.exports = router