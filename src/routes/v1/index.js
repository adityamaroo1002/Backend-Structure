const express = require('express');

const infoRouter = require('./info-route');
const userRouter = require('./user-route');
const cityRouter = require('./city-route')

const router = express.Router();

router.use('/info', infoRouter);
router.use('/user', userRouter);
router.use('/city', cityRouter)

module.exports = router