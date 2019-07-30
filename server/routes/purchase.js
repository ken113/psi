const Router = require('koa-router');
const purchaseController = require('../controller/purchase')

const router = new Router({
  prefix: '/purchase'
});

router.post('/add', purchaseController.create)

router.post('/getPurchaseList', purchaseController.getPurchaseList)

router.get('/getPurchaseById/:purchaseId', purchaseController.getPurchaseById)

router.post('/updatePurchase', purchaseController.updatePurchase)

module.exports = router;