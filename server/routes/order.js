const Router = require('koa-router');
const orderController = require('../controller/order')

const router = new Router({
  prefix: '/order'
});

router.post('/add', orderController.create)

router.post('/getOrderList', orderController.getOrderList)

router.get('/getOrderById/:orderId', orderController.getOrderById)

router.post('/updateOrder', orderController.updateOrder)

module.exports = router;