const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')

const koajwt = require('koa-jwt')
const cors = require('koa-cors')

const user = require('./routes/user')
const material = require('./routes/material')
const order = require('./routes/order')
const customer = require('./routes/customer')
const supplier = require('./routes/supplier')
const purchase = require('./routes/purchase')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use(cors())

// logger
/*app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})*/
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: '-2000',
        desc: '登陆过期，请重新登陆'
      };
    } else {
      throw err;
    }
  })
})

app.use(koajwt({
  secret: '123456',
  //passthrough: true
}).unless({
  path: [/^\/user\/regist/, /^\/user\/login/]
}))

// routes
app.use(index.routes(), index.allowedMethods())

app.use(user.routes(), user.allowedMethods())

app.use(material.routes(), material.allowedMethods())

app.use(order.routes(), order.allowedMethods())

app.use(customer.routes(), customer.allowedMethods())

app.use(supplier.routes(), supplier.allowedMethods())

app.use(purchase.routes(), purchase.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(3333);

module.exports = app
