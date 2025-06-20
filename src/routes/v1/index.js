const express = require('express');

const infoRouter = require('./info-route');
const userRouter = require('./user-route');
const cityRouter = require('./city-route')
const officeRouter = require('./office-route')
const companyRouter = require('./company-router')

const router = express.Router();

router.use('/info', infoRouter);
router.use('/user', userRouter);
router.use('/city', cityRouter);
router.use('/office', officeRouter)
router.use('/company',companyRouter)

module.exports = router