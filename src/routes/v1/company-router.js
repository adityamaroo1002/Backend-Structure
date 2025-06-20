const {CompanyController} = require('../../controller/index');
const express = require('express');
const router = express.Router();
const {OfficeMiddleWare, CompanyMiddleWare} = require('../../middlewares/index')

router.post('/create_company',CompanyMiddleWare.validationCreate,CompanyController.createCompanyController);
router.get('/get_company',CompanyController.getCompanyDetail);
router.post('/specific_company/:id', CompanyController.getSpecificCompany)
router.delete('/delete_company/:id', CompanyController.deleteSpecificCompany)
router.put('/update_company/:id', CompanyController.updateCompanyDetail);
router.get('/', CompanyController.filterCompanyData)

module.exports = router;