import axios from 'axios'
import store from '@/store'
const token = store.getters.token
console.log(token)
// 创建 axios 实例，将来对创建出来的实例，进行自定义配置
// 好处：不会污染原始的 axios 实例
const require = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  // headers: { 'X-Custom-Header': 'foobar' }
  headers: {
    platform: 'H5',
    'Content-Type': 'application/json'
    // Authorization: `Bearer ${token}`
  }
})

// 自定义配置 - 请求/响应 拦截器
// 添加请求拦截器

// 原本这里是 axios.interceptors.request.use(function (config)
// 但我们在上面给这个axios实例定义了变量名,所以这里把axios.interceptors改成instance.interceptors

// instance.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   // 开启loading，禁止背景点击（节流处理，防止多次无效触发）
//   Toast.loading({
//     message: '加载中...',
//     // 背景点击
//     forbidClick: true,
//     loadingType: 'spinner',
//     // 默认展示时长
//     duration: 0 // 不会自动关闭
//   })

//   return config
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })

// 添加响应拦截器
// instance.interceptors.response.use(function (response) {
//   // 2xx 范围内的状态码都会触发该函数。
//   // 对响应数据做点什么 (默认axios会多包装一层data,需要响应拦截器处理一下)
//   const res = response.data
//   if (res.status !== 200) {
//     // 给错误提示，Toast 默认是单例模式，后面的 Toast 调用了，会将前一个覆盖
//     Toast(res.message)
//     // 抛出一个错误的promise
//     return Promise.reject(res.message)
//   } else {
//     // 正确情况，直接走业务核心逻辑，清除loading效果
//     Toast.clear()
//   }
//   return res
// }, function (error) {
//   // 超出 2xx 范围的状态码都会触发该函数。
//   // 对响应错误做点什么
//   return Promise.reject(error)
// })
// 导出配置好的实例
export default require
