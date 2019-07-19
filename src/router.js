import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '*', component: () => import('./views/404.vue') },
    { path: '/notFindPage', name: 'notFindPage', component: () => import('./views/404.vue') },
    { path: '/login', name: 'login', component: () => import('./views/login.vue') },
    {
      path: '/',
      component: () => import('./views/topNav.vue'),
      meta: { auth: true },
      redirect: '/order',
      children: [
        { path: '/order', component: () => import('./views/order/order.vue') },
        { path: '/order/add', component: () => import('./views/order/addOrder.vue') },
        { path: '/order/edit/:orderId', component: () => import('./views/order/editOrder.vue') },
        { path: '/material', component: () => import('./views/material/material.vue') },
        { path: '/material/add', component: () => import('./views/material/addMaterial.vue') },
        { path: '/material/edit/:materialId', component: () => import('./views/material/editMaterial.vue') },
        { path: '/user', component: () => import('./views/user/user.vue') },
        { path: '/user/add', component: () => import('./views/user/addUser.vue') },
        { path: '/user/edit/:userId', component: () => import('./views/user/editUser.vue') },
      ]
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) { //权限判断
    if (localStorage.getItem('token')) { //读取token值
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
  if (to.name === null) {
    next({ path: '/notFindPage' });
  }
});

export default router;
