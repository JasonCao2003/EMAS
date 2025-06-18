import Vue from 'vue'
import VueRouter from 'vue-router'

import home from '@/views/home'
import layout from '@/views/layout'
import user from '@/views/user'
import article from '@/views/article'
import test from '@/views/test'

import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: home
      // redirect: '/home'
    },
    { path: '/layout', component: layout },
    { path: '/user', component: user },
    { path: '/article', component: article },
    { path: '/test', component: test }
  ]
})

// 全局前置导航守卫
const authUrls = ['/user', '/layout']

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  if (!authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }

  // 是权限页面，需要判断 token
  const token = store.getters.token
  // console.log('这是测是store中是否含有token')
  // console.log(token)
  if (token) {
    next()
  } else {
    alert('请先登录')
    next('/')
  }
})

export default router
