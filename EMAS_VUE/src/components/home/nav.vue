<template>
  <div class="nav" tabindex="0">
    <div class="logo-nav"></div>
    <ul class="text-nav">
      <li id="li1"><router-link to="/" style="color: blue;">首页</router-link></li>
      <li><router-link to="/layout">对话</router-link></li>
      <li><router-link to="/article">文章推荐</router-link></li>
    </ul>
    <div class="user">
      <div class="userimg"></div>
      <div @click="userLogin" class="unlogin">您好，请登录</div>
      <div class="logined" @click="isShow(username)">{{ username }}</div>
      <div class="userSelect">
        <router-link to="/user"><div class="userHome"><i class="el-icon-user-solid"></i>个人中心</div></router-link>
        <div class="userExit" @click="userExit"><i class="el-icon-s-home"></i>退出登录</div>
      </div>
    </div>
    <homeLogin v-show="isVisible" @updateVisible="updateVisible"></homeLogin>
    <!-- <homeLogin></homeLogin> -->
  </div>
</template>

<script>
import homeLogin from '@/components/home/login.vue'
import { isShow } from '@/utils/home/nav.js'
export default {
  name: 'homeNav',
  components: {
    homeLogin
  },
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
    if (this.username !== null) {
      document.querySelector('.unlogin').style.display = 'none'
    } else {
      document.querySelector('.logined').style.display = 'none'
    }
  }
}
</script>

<style lang="less" scoped src="@/styles/home/nav.less">
</style>
