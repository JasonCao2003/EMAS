<template>
  <div class="nav" tabindex="0">
    <div class="logo-nav"></div>
    <ul class="text-nav">
      <li><router-link to="/">首页</router-link></li>
      <li><router-link to="/layout">对话</router-link></li>
      <li><router-link to="/article">文章推荐</router-link></li>
    </ul>
    <div class="user">
      <div class="userimg"></div>
      <div class="logined" @click="isShow(username)">{{ username }}</div>
      <div class="userSelect" tabindex="0">
        <div class="userHome"><router-link to="/user"><i class="el-icon-user-solid" ></i>个人中心</router-link></div>
        <div class="userExit" @click="userExit"><i class="el-icon-s-home"></i>退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { isShow } from '@/utils/home/nav.js'
export default {
  name: 'homeNav',
  data () {
    return {
      isVisible: false,
      token: localStorage.getItem('token'),
      username: localStorage.getItem('username'),
      useravatar: localStorage.getItem('useravatar')
    }
  },
  methods: {
    isShow,
    userLogin () {
      this.isVisible = !this.isVisible
    },
    updateVisible (value) {
      this.isVisible = value
    },
    userExit () {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('useravatar')
      localStorage.removeItem('useremail')
      location.reload()
    }
  },
  mounted () {
    document.querySelector('.userimg').style.backgroundImage = `url(${this.useravatar})`
  }
}
</script>

<style lang="less" scoped src="@/styles/user/nav.less">
</style>
