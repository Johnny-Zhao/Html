import Vue from 'vue'
import vueResource from 'vue-resource'
import store from './store/store.js'
import router from './router/index.js'

// 引入静态资源
require('./assets/css/style.css')
require('./assets/css/animate.css')
require('./assets/js/sherd.js')

Vue.use(vueResource)

// 创建和挂载根实例
// 记得要通过 router 配置参数注入路由
// 从而让整个应用都有路由功能
const routerApp = new Vue({
  router,
  store
}).$mount('#app')
export default routerApp
