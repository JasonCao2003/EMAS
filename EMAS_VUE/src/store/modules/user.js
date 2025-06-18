import { getInfo, setInfo } from '@/utils/storage'

export default {
  // 开启命名空间
  namespaced: true,
  // 提供数据
  state () {
    return {
      // 个人权证相关
      userInfo: getInfo()
    }
  },

  // 提供修改数据的方法
  mutations: {
    // 所有 mutations 的第一个参数都是 state
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },

  // 提供异步操作
  actions: {},

  // 提供基于state派生出来的异步属性
  getters: {}
}
