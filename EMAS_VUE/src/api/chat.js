import axios from 'axios'
/*
    AI情感交互
    文本 & 语音 & 图片
*/
// 文本上传
export const textRecord = (text) => {
  console.log('文本上传中。。。')
  return axios.post('/record/textRecord', { text })
}

// 语音上传
export const voiceRecord = (audio) => {
  console.log('语音上传中。。。')
  return axios.post('/record/voiceRecord', audio)
}

// 图片上传
export const faceRecord = (image) => {
  console.log('面部表情记录上上传中。。。')
  return axios.post('/record/faceRecord', image)
}

// 获取文本记录
export const listTextRecords = () => {
  console.log('获取文本记录axios')
  return axios.post('/record/listTextRecords')
}

// 获取图片记录
export const listFaceRecords = () => {
  console.log('获取图片记录axios')
  return axios.post('/record/listFaceRecords')
}

// 获取语音记录
export const listVoiceRecords = () => {
  console.log('获取语音记录axios')
  return axios.post('/record/listVoiceRecords')
}
