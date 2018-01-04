// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// import 'babel-polyfill';

import promise from 'es6-promise';//解决axios在ie9下不生效的方法
promise.polyfill();

import $ from 'jquery'

import Vue from 'vue';
import App from './App';
import router from './router';

//ui选择elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './common/css/index.less'
Vue.use(ElementUI);

import filter from './filter'
filter(Vue);

import echarts from 'echarts';
Vue.prototype.echarts = echarts;

import axios from 'axios';
Vue.prototype.$http = axios;

Vue.config.productionTip = false

import store from './vuex'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
