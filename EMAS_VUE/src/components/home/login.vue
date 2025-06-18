<template>
  <div class="homeLogin">
    <div class="tip"><span>{{ tip }}</span></div>
    <div class="shell">
      <div class="img"><img src="@/assets/home/login/loginBg.jpg" alt=""></div>
      <div class="account-login">
        <div class="ucancel" @click="ucancel">×</div>
        <div class="nav">
          <input class="nav-inp active" id="accountLogin" type="button" value="账号登录">
          <span>|</span>
          <input class="nav-inp" id="emailLogin" type="button" value="邮箱登录">
        </div>
        <div class="ubody" id="acc-login">
          <form id="acc-form">
            <div>账号</div><input type="text" placeholder="请输入账号" v-model="accountObj.username">
          </form>
          <form id="pwd-form">
            <div>密码</div><input type="password" placeholder="请输入密码" v-model="accountObj.password">
          </form>
        </div>
        <div class="ubody" id="email-login">
          <form id="email-form">
            <div>邮箱</div><input type="text" placeholder="请输入邮箱地址" v-model="emailObj.email">
          </form>
          <form id="code-form">
            <div>验证码</div><input v-model="emailObj.code" type="text" placeholder="请输入验证码" maxlength="6" style="width: 120px;">
            <button @click.prevent="getCodePrevent" @click="getEamilCode" class="getCode">{{ second === totalSecond ? '获取验证码' : '请等待(' + second + ')' }}</button>
          </form>
        </div>
        <div class="ubody" id="face-login">
          <div class="face-form">
            <video id="video" autoplay playsinline></video>
            <canvas id="canvas"></canvas>
          </div>
        </div>
        <div class="ubody" id="voice-login">
          <div class="voice-form">
            <button id="startBtn">开始录音</button>
            <button id="stopBtn">停止并发送</button>
          </div>
        </div>
        <div class="ufoot">
          <button type="submit" id="regBtn" @click="accountRegister">注册</button>
          <button type="submit" id="logBtn" @click="uniteLogin">登录</button>
        </div>
        <div class="oth-login">
          <span>其它方式登录</span>
          <div class="each-login" id="face-login">
            <img src="@/assets/home/login/faceLogin.jpg" alt=""><span id="faceLoginBtn" @click="faceLogin">人脸登录</span>
            <img src="@/assets/home/login/voiceLogin.jpg" alt=""><span id="voiceLoginBtn" @click="voiceLogin">声纹登录</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { tipShow, ucancel, switchLogin, getCodePrevent, handler, faceLogin, voiceLogin, uniteLogin } from '@/utils/home/login.js'
import { getEamilCode, accountRegister, getUser } from '@/api/login'
export default {
  name: 'homeLogin',
  data () {
    return {
      tip: '',
      accountObj: {
        username: '',
        password: ''
      },
      emailObj: {
        email: '',
        code: ''
      },
      totalSecond: 60,
      second: 60,
      codeTimer: null
    }
  },
  methods: {
    // 统一登陆
    async uniteLogin () {
      const res = await uniteLogin(this.accountObj.username, this.accountObj.password, this.emailObj.email, this.emailObj.code)
      console.log(res)
      if (localStorage.getItem('token') || localStorage.getItem('username') || localStorage.getItem('useremail') || localStorage.getItem('useravatar')) {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('useremail')
        localStorage.removeItem('useravatar')
      } else if (res.data.data) {
        localStorage.setItem('token', res.data.data)
        const msg = await getUser()
        console.log(msg.data.data)
        localStorage.setItem('username', msg.data.data.username)
        localStorage.setItem('useremail', msg.data.data.email)
        localStorage.setItem('useravatar', msg.data.data.avatar)
        location.reload()
      } else {
        this.tip = res.data.message
        tipShow()
      }
    },
    ucancel,
    getCodePrevent,
    // 注册
    async accountRegister () {
      await accountRegister(this.accountObj.username, this.accountObj.password)
    },
    // 获取邮箱验证码
    async getEamilCode () {
      await getEamilCode(this.emailObj.email)
    },
    faceLogin,
    voiceLogin
  },
  mounted () {
    // 切换登录方式
    switchLogin()
    tipShow()
  },
  watch: {
    emailObj: {
      deep: true,
      immediate: true,
      handler
    }
  }
}
</script>

<style lang="less" scoped src="@/styles/home/login.less"></style>
