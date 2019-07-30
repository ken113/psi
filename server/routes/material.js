const Router = require('koa-router');
const materialController = require('../controller/material')

const router = new Router({
  prefix: '/material'
});

router.post('/add', materialController.create)

router.post('/getMaterialList', materialController.getMaterialList)

router.get('/getMaterialById/:materialId', materialController.getMaterialById)

router.post('/updateMaterial', materialController.updateMaterial)

module.exports = router;