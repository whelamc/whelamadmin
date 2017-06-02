import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import Login from '@/pages/Login'
import User from '@/pages/User'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/user',
      name: 'User',
      component: User,
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
