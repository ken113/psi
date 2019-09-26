const Router = require('koa-router');
const orderController = require('../controller/order')
const send = require('koa-send');

const router = new Router({
  prefix: '/order'
});

router.post('/add', orderController.create)

router.post('/getOrderList', orderController.getOrderList)

router.get('/getOrderById/:orderId', orderController.getOrderById)

router.post('/updateOrder', orderController.updateOrder)

router.post('/import', orderController.importData)

router.post('/download/:name', async (ctx, next) => {
  const name = ctx.params.name;
  const path = `excel/${name}`;
  ctx.attachment(path);
  await send(ctx, path);
})

module.exports = router;