// 此处用于存放所有登陆相关的接口请求
import axios from 'axios'
/*
    账号密码
    注册 & 登录
*/
// 注册
export const accountRegister = (username, password) => {
  console.log('账号注册中。。。')
  axios.post('/user/register', { username, password }).then((res) => console.log(res))
}
// 登录
export const accountLogin = (username, password) => {
  console.log('账号登录中。。。。')
  return axios.post('/login/pwdLogin', { username, password })
}

/*
    邮箱验证码
    获取验证码 & 登录
*/
// 获取验证码
export const getEamilCode = (email) => {
  console.log('获取验证码中。。。。')
  return axios.post('/login/sendValidation', { email })
}
// 登录
export const emailLogin = (email, code) => {
  console.log('邮箱登录中。。。。')
  return axios.post('/login/emailLogin', { email, code })
}

/*
    人脸登录
*/

/**
 * 获取用户信息
 */
export const getUser = () => {
  console.log('获取用户信息')
  return axios.post('/user/getUser')
}
