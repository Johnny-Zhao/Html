import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import App from '../App'
import SearchList from '../components/SearchList'
import Singer from '../components/Singer'
import Album from '../components/Album'
import Audio from '../components/Audio'
import Recommended from '../components/Recommended'
import Count from '../components/Count'
import Login from '../components/Login'
import Register from '../components/Register'

Vue.use(VueRouter)

// 路由
const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/recommended',
    component: App,
    children: [
      {
        path: 'searchList',
        component: SearchList
      }, {
        path: 'singer',
        component: Singer
      },
      {
        path: 'album',
        component: Album
      },
      {
        path: 'audio',
        component: Audio
      },
      {
        path: 'recommended',
        component: Recommended
      },
      {
        path: 'count',
        component: Count
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  }
]
// 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

export default router