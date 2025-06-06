const express = require('express');

const infoRouter = require('./info-route');
const userRouter = require('./user-route');

const router = express.Router();

router.use('/info', infoRouter);
router.use('/user', userRouter);

module.exports = router