// 约定一个通用的键名
const username = ''
// const defaultObj = { token: '', userId: '' }
const HISTORY_KEY = ''

// 获取个人信息
export const getInfo = () => {
  const res = {
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username')
  }
  return res
}
// 设置个人信息
export const setInfo = (obj) => {
  localStorage.setItem(username, JSON.stringify(obj))
}
// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(username)
}
// 获取搜索历史
export const getHistoryList = () => {
  const res = localStorage.getItem(HISTORY_KEY)
  return res ? JSON.parse(res) : []
}
// 设置搜索历史
export const setHistoryList = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
