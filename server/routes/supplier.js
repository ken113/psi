const Router = require('koa-router');
const supplierController = require('../controller/supplier')

const router = new Router({
  prefix: '/supplier'
});

router.post('/add', supplierController.create)

router.post('/getSupplierList', supplierController.getSupplierList)

router.get('/getSupplierById/:supplierId', supplierController.getSupplierById)

router.post('/updateSupplier', supplierController.updateSupplier)

module.exports = router;