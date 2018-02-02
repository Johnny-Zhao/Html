import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


//登录页面
const login = resolve => require(['../base/login'], resolve);
//首页
const index = resolve => require(['../base/index'], resolve);
//404错误界面
const error404 = resolve => require(['../base/error404'], resolve);
//500错误界面
const err500 = resolve => require(['../base/error500'], resolve);

//智能分析
const componentdemo1 = resolve => require(['../views/componentdemo1'], resolve);//demo页

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/error404',
    name: 'error404',
    component: error404
  },
  {
    path: '/err500',
    name: 'err500',
    component: err500
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    children:[
      {
        path: '/index/componentdemo1',
        name: 'demo页',
        component:componentdemo1
      },
      {
        path: '/index',
        redirect:'/index/componentdemo1'
      }
    ]
  },
]


const router = new Router({
  routes: routes,
  mode: 'history',
})

export default router
