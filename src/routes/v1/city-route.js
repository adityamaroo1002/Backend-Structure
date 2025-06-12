const {CityController} = require('../../controller/index');
const express = require('express');
const router = express.Router();
const {CityMiddleWare} = require('../../middlewares/index')

router.post('/create_city',CityMiddleWare.validationCreate, CityController.createCityController);
router.get('/get_city',CityController.getCities);
router.post('/specific_city/:id', CityController.getSpecificCity)
router.delete('/delete_city/:id', CityController.deleteSpecificCity)
router.put('/update_city/:id', CityController.updateCityDetail)

module.exports = router;