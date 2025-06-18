import axios from 'axios'
/**
    用户界面api
    更新用户信息
 */

// 更新用户信息
export const updateUser = (nickname, email, sex, birthday) => {
  return axios.post('/user/update', { nickname, email, sex, birthday })
}

// 获取情绪值
export const countEmotions = () => {
  return axios.post('/record/countEmotions')
}

// 获取每日情绪值
export const getDailyEmotion = () => {
  return axios.post('/record/getDailyEmotion')
}

// 获取阅读过的文章
export const getLikedArticles = () => {
  return axios.post('/article/getLikedArticles')
}

// 修改密码，获取验证码
export const emailValidation = () => {
  return axios.post('/user/emailValidation')
}

// 修改密码
export const updatePwd = (oldPwd, newPwd, rePwd, code) => {
  return axios.post('/user/updatePwd', { oldPwd, newPwd, rePwd, code })
}

// 更改人脸信息
export const faceRecord = (formData) => {
  return axios.post('/record/faceRecord', formData)
}

// 上传声纹信息
export const voiceRecord = (audio) => {
  return axios.post('/user/addVoiceInfo', audio)
}

// 上传头像
export const updateAvatar = (formData) => {
  return axios.post('/user/updateAvatar', formData)
}

// 获取用户信息
export const getUser = () => {
  return axios.post('user/getUser')
}
