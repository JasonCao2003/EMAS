import request from '@/utils/request.js'
export const updateUserMsg = (nickname, email, sex, birthday) => {
  return request.post('/user/update', {
    nickname,
    email,
    sex,
    birthday
  }
  )
}
