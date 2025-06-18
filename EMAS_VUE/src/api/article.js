import axios from 'axios'
// 获取随机文章
export const getRandomArticles = () => {
  return axios.post('/article/getRandomArticles')
}

// 获取收藏的文章
export const getLikedArticles = () => {
  return axios.post('/article/getLikedArticles')
}

// 反馈 喜欢 || 不喜欢
export const submitFeedback = (articleId, feedback) => {
  return axios.post('/article/like', { articleId, feedback })
}

export const dislikeFeedback = (articleId) => {
  return axios.post('/article/dislike', { articleId })
}
