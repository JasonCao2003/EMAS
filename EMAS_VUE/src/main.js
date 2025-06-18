import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import '@/styles/common.less'
// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

// token配置
axios.interceptors.request.use(config => {
  const authorization = localStorage.getItem('token')
  if (authorization) {
    config.headers.Authorization = authorization
  }
  return config
}, error => {
  Promise.reject(error)
})

// axios默认目标网址配置
axios.defaults.baseURL = 'http://ahn6ny.natappfree.cc'
// axios.defaults.timeout = 5000
// axios.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     if (error.code === 'ECONNABORTED') {
//       alert('请求超时，请稍后再试')
//     } else {
//       alert('网络错误，请稍后再试')
//     }
//     return Promise.reject(error)
//   }
// )
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
