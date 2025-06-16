const {OfficeController} = require('../../controller/index');
const express = require('express');
const router = express.Router();
const {OfficeMiddleWare} = require('../../middlewares/index')

router.post('/create_office',OfficeMiddleWare.validationCreate, OfficeController.createOfficeController);
router.get('/get_office',OfficeController.getOfficeDetail);
router.post('/specific_office/:id', OfficeController.getSpecificOffice)
router.delete('/delete_office/:id', OfficeController.deleteSpecificOffice)
router.put('/update_office/:id', OfficeController.updateOfficeDetail)

module.exports = router;