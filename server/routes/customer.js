const Router = require('koa-router');
const customerController = require('../controller/customer')

const router = new Router({
  prefix: '/customer'
});

router.post('/add', customerController.create)

router.post('/getCustomerList', customerController.getCustomerList)

router.get('/getCustomerById/:customerId', customerController.getCustomerById)

router.post('/updateCustomer', customerController.updateCustomer)

module.exports = router;