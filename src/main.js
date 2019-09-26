import Vue from 'vue'
import App from './App.vue'
import store from './store'
import {
  Menu, MenuItem, Submenu, Button, Breadcrumb, BreadcrumbItem, Select, Radio, RadioGroup, RadioButton, Form, FormItem, Input, Option, DatePicker, Table,
  TableColumn, MessageBox, Message, Pagination, Autocomplete
} from 'element-ui';
import router from './router'
import axios from 'axios';
import './css/datacenter.scss';

Vue.prototype.$ELEMENT = { size: 'small' }

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Button)
Vue.use(Select)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Autocomplete)

Vue.config.productionTip = false

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

if (window.location.href.indexOf('localhost') === -1) {
  axios.defaults.baseURL = 'http://e6664aa5.ngrok.io';
} else {
  axios.defaults.baseURL = 'http://localhost:3333';
}

axios.defaults.timeout = 100000;

axios.interceptors.request.use(function (config) {
  //将token写入请求头
  if (window.localStorage.getItem('token')) {
    config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token');
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.localStorage.removeItem("token"); //可能是token过期，清除它
          console.log(router.currentRoute.fullPath);
          router.replace({ //跳转到登录页面
            path: '/login',
            query: {
              // 将跳转的路由path作为参数，登录成功后跳转到该路由
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return Promise.reject(error) // 返回接口返回的错误信息
  }
);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
