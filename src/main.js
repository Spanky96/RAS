import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css';
import './assets/css/animate.css';
import App from './App';
// 支持IE 浏览器
import 'babel-polyfill';
// 数据存储
import db from './db';
// 路由配置
import router from './router';
// 支持$http
import axios from 'axios';
import Vum from './vum.js';
import Print from '@/plugs/print';
import validator from './validator';
Vue.use(ElementUI);
Vue.use(Print);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.prototype.$db = db;
Vue.prototype.$validator = validator;
axios.defaults.withCredentials = true;
Vue.use(Vum);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

Vum.router(router);
