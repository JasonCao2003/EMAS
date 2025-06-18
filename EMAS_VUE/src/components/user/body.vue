<template>
  <div class="userbody">
    <div class="blur"></div>
    <div class="header">
      <div class="h-inner">
        <div class="bodyImg"></div>
        <h2>{{ username }}</h2>
        <span>{{ usercontent }}</span>
      </div>
      <ul class="h-select">
        <li class="active">阅读</li>
        <li>情绪</li>
        <li>设置</li>
        <div class="nth-li"></div>
      </ul>
    </div>
    <div class="footer">
      <!-- 阅读 -->
      <div id="footer" class="read-footer">
        <div class="table">
          <div class="header">
            <h1>收藏的文章</h1>
            <div class="input-group">
              <input type="search" placeholder="Search Data...">
              <i class="el-icon-discover"></i>
            </div>
          </div>
          <div class="shell">
            <table>
              <thead>
                <tr>
                  <th style="width: 100px">文章id</th>
                  <th>概要</th>
                  <th style="width: 200px">标题</th>
                  <!-- <th>收藏时间</th> -->
                  <th  style="width: 120px">操作</th>
                </tr>
              </thead>
              <tbody>
                <!-- <tr>
                  <td>001</td>
                  <td>文章名</td>
                  <td>作者</td>
                  <td>收藏时间</td>
                  <td><p class="button">阅读</p></td>
                </tr> -->
              </tbody>
            </table>
          </div>
        </div>
        <div class="book">
          <!-- 这是翻开之后书本右侧的内容 -->
          <div class="content a" style="--i:2;">
            <div class="bookContent"></div>
          </div>
          <div class="content b" style="--i:4; --s:1;">
            <span class="bookTitle"></span>
          </div>
          <div class="content c" style="--i:3; --s:2;"></div>
          <div class="content d" style="--i:2; --s:3;"></div>
          <!-- 这是翻开之后书本左侧的内容 -->
          <div class="content e" style="--i:1; --s:4;"></div>
        </div>
      </div>
      <!-- 情绪 -->
      <div id="footer" class="emo-footer">
        <div class="shell" @mouseleave="noneDisplay">
          <header>
            <div class="day">{{ day }}</div>
            <div class="month" style="text-transform: capitalize;">{{ month }}</div>
          </header>
          <table class="calendar">
            <thead>
              <tr>
                <td>Mon</td>
                <td>Tue</td>
                <td>Wed</td>
                <td>Thu</td>
                <td>Fri</td>
                <td>Sat</td>
                <td>Sun</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="prev-month">28</td>
                <td class="prev-month">29</td>
                <td class="prev-month">30</td>
                <td class="prev-month">31</td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
              <tr>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
                <td>10</td>
              </tr>
              <tr>
                <td>11</td>
                <td>12</td>
                <td>13</td>
                <td>14</td>
                <td>15</td>
                <td>16</td>
                <td>17</td>
              </tr>
              <tr>
                <td>18</td>
                <td>19</td>
                <td>20</td>
                <td>21</td>
                <td>22</td>
                <td>23</td>
                <td>24</td>
              </tr>
              <tr>
                <td>25</td>
                <td>26</td>
                <td>27</td>
                <td>28</td>
                <td>29</td>
                <td>30</td>
                <td class="next-month">1</td>
              </tr>
            </tbody>
          </table>
          <div class="ring-left"></div>
          <div class="ring-right"></div>
        </div>
        <div class="dailyEmoShow"></div>
        <div class="echartsArea" id="main"></div>
      </div>
      <!--设置 -->
      <div id="footer" class="setting-footer">
        <div class="msg-select">
          <ul class="setting-select">
            <div>个人设置</div>
            <li class="li-active"><i class="el-icon-user"></i>我的信息</li>
            <li @click="clickLoad()"><i class="el-icon-picture-outline"></i>我的头像</li>
            <li class="accountSafeLi"><i class="el-icon-setting"></i>账号安全</li>
          </ul>
        </div>
        <!-- 我的信息 -->
        <div class="my-msg" id="my-setting">
          <div class="my-msg-title"><span></span>我的信息</div>
          <form class="msg-form">
            <div class="nickname">
              <label>昵称：</label>
              <input type="text" v-model="updateObj.nickname">
            </div>
            <div class="email">
              <label>邮箱：</label>
              <input type="text" v-model="updateObj.email">
            </div>
            <!-- <div class="signature">
              <label>我的签名：</label>
              <textarea name="" id=""></textarea>
            </div> -->
            <div class="gender" @click="choseSex">
              <label>性别：</label>
              <input type="radio" name="gender" id="male" value="男"><label for="male">男生</label>
              <input type="radio" name="gender" id="female" value="女"><label for="female">女生</label>
              <input type="radio" name="gender" id="secret"><label for="secret">保密</label>
            </div>
            <div class="birthday">
              <label>出生日期：</label>
              <input type="date" id="dateInput" v-model="updateObj.birthday">
            </div>
            <button @click.stop="updateUser">保存</button>
          </form>
          <!-- <div class="my-msg-title"><span></span>我的信息</div> -->
        </div>
        <!-- 我的头像 -->
        <div class="my-avater" id="my-setting">
          <div class="img-show">
            <div class="my-msg-title"><span></span>我的头像</div>
            <div class="multifunction">
              <button class="avaterBtn">更换头像</button>
              <div class="currentImg"></div>
            </div>
          </div>
          <div class="img-change">
            <div class="my-msg-title"><span></span>我的头像 <div
                style="display: inline-block; color: #222; font-size: 15px;">&#62; 更换头像</div>
            </div>
            <div class="img-change-footer">
              <div class="inp-img">
                <label for="uploadImage"><span>选择本地图片</span></label>
                <input @change="handleFileChange" type="file" id="uploadImage" accept="image/*" style="display: none;">
                <!-- <label><span>选择数字艺术头像</span></label> -->
              </div>
              <div class="current-img">
                <img id="currentAvater">
                <span>当前头像</span>
              </div>
            </div>
            <span class="span-tip">请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M</span>
            <button class="changeAvaterBtn" @click="uploadAvatar">更新</button>
          </div>
        </div>
        <!-- 账号安全 -->
        <div class="account-security" id="my-setting">
          <div class="my-msg-title"><span></span>账号安全</div>
          <div class="changeDiv" id="pwdChangeDiv">
            <div class="inpTitle">
              <h3>修改密码</h3>
              <span>密码可由数字、大写英文字母、小写英文字母、特殊字符组成，长度要求6-16位字符。</span>
              <button class="cancelChangeBtn">取消</button>
            </div>
            <form>
                  <div class="inpDiv"><input v-model="pwd.oldPwd" type="text" placeholder="填写 旧密码"></div>
                  <div class="inpDiv"><input v-model="pwd.newPwd" type="text" placeholder="填写 新密码"></div>
                  <div class="inpDiv"><input v-model="pwd.rePwd" type="text" placeholder="请确认密码"></div>
                  <div class="inpDiv"><input v-model="pwd.code" type="text" placeholder="填写邮箱验证码" maxlength="6"><button class="sendValidation" @click="emailValidation">获取验证码</button></div>
                  <button class="changeSub" @click="updatePwd">确认</button>
            </form>
          </div>
          <div class="changeDiv" id="faceChangeDiv">
            <div class="inpTitle">
              <h3>更新面部信息</h3>
              <span>请注意，上传面部信息是一个严肃的决定，因为它涉及到您的生物特征识别信息。一旦上传，这些信息将与您的账户紧密关联，因此请务必谨慎对待，并确保您的账户安全。</span>
              <button class="cancelChangeBtn">取消</button>
            </div>
            <form>
              <video id="video" autoplay playsinline></video>
              <canvas style="display: none;" id="canvas"></canvas>
              <button class="changeSub" id="sendfaceUpdate">确认</button>
            </form>
          </div>
          <div class="changeDiv" id="voiceChangeDiv">
            <div class="inpTitle">
              <h3>上传声纹信息</h3>
              <span>我们采用高级的加密技术，确保您的语音数据在传输和存储过程中得到最高级别的保护。只有经过授权的系统才能访问这些信息，并且仅用于身份验证和相关服务提供的目的。最后，请保证上传的声纹信息时长在 5s 左右。</span>
              <button class="cancelChangeBtn">取消</button>
            </div>
            <form>
              <button class="changeSub" id="startBtn">开始录音</button>
              <button class="changeSub" id="stopBtn">停止录音并上传</button>
            </form>
          </div>
          <div class="content-safe">
            <div class="security-setting">
              <div class="secur-icon"></div>
              <div class="safe-msg">
                <p class="safe-title">我的密码</p>
                <p class="safe-desc">修改密码后需要重新登录</p>
                <span class="safe-nobtn">已绑定</span>
                <span class="safe-link" id="pwdChange">修改密码&#62;</span>
              </div>
            </div>
            <div class="security-setting">
              <div class="secur-icon"></div>
              <div class="safe-msg">
                <p class="safe-title">我的人脸信息</p>
                <p class="safe-desc">上传照片后即可使用人脸登录</p>
                <span class="safe-nobtn">已绑定</span>
                <span class="safe-link" id="faceChange">更改人脸信息&#62;</span>
              </div>
            </div>
            <div class="security-setting">
              <div class="secur-icon"></div>
              <div class="safe-msg">
                <p class="safe-title">我的声纹信息</p>
                <p class="safe-desc">上传声音片段后即可使用声纹登录</p>
                <span class="safe-nobtn">已绑定</span>
                <span class="safe-link" id="voiceChange">更改声纹信息&#62;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { changeFooter, changeSettingSelect, changeAvater, inputDate, showLikedArticles, safeLink, faceUpdate, voiceUpdate, handleFileChange, uploadAvatar, getUserMsg, currentDay, getDailEmo, echartsShow, moveinDay } from '@/utils/user/body'
import { updateUser, emailValidation, updatePwd } from '@/api/user.js'
export default {
  name: 'userBody',
  data () {
    return {
      username: localStorage.getItem('username'),
      usercontent: '在你被乐园带走之前 我来把你接走',
      uid: 1411331445,
      bir: '05-07',
      toDate: '',
      photo: null,
      file: null,
      emo: {
        emotion_count: [],
        emotion: []
      },
      updateObj: {
        nickname: '',
        email: '',
        sex: '',
        birthday: ''
      },
      pwd: {
        oldPwd: '',
        newPwd: '',
        rePwd: '',
        code: ''
      },
      month: '',
      day: '',
      useravatar: localStorage.getItem('useravatar')
    }
  },
  async mounted () {
    document.querySelector('.bodyImg').style.backgroundImage = `url(${this.useravatar})`
    document.querySelector('.currentImg').style.backgroundImage = `url(${this.useravatar})`
    document.querySelector('#currentAvater').style.backgroundImage = `url(${this.useravatar})`
    // tab栏切换
    changeFooter()
    // 日期选择器
    inputDate()
    // 设置栏 - tab栏切换
    changeSettingSelect()
    // 获取用户信息
    const res = await getUserMsg()
    // console.log(res)
    this.updateObj = res
    // 情绪
    const current = await currentDay()
    // console.log(current)
    this.month = current.month
    this.day = current.day
    // 日情绪
    getDailEmo()
    // 更改头像
    changeAvater()
    // “设置” - “我的信息” - “出生日期”默认为当天
    const date = new Date()
    const toDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    if (!this.updateObj.birthday) this.updateObj.birthday = toDate
    // 获取收藏的文章
    showLikedArticles()
    // 账号安全设置 切换页面
    safeLink()
    // 更新面部信息
    faceUpdate()
    // 上传声纹信息
    voiceUpdate()
    // 给日历每日都设置监听
    const days = document.querySelectorAll('tbody td')
    for (let i = 0; i < 34; i++) {
      days[i].addEventListener('mouseenter', (event) => {
        moveinDay(days[i].innerText)
        // console.log(event)
        const mouseDiv = document.querySelector('.dailyEmoShow')
        mouseDiv.style.left = (event.pageX / 6) + 'px'
        mouseDiv.style.top = (event.pageY / 2.8) + 'px'
      })
    }
    // echarts
    echartsShow()
  },
  methods: {
    noneDisplay () {
      console.log('leave事件')
      document.querySelector('.dailyEmoShow').style.display = 'none'
    },
    // 重置“我的头像”状态
    clickLoad () {
      document.querySelector('.img-show').style.display = 'block'
      document.querySelector('.img-change').style.display = 'none'
    },
    // 更新头像 - 处理文件选择事件
    handleFileChange,
    // 上传头像
    uploadAvatar,
    // “设置” - “我的信息” - “性别”设置
    choseSex () {
      const inps = document.querySelectorAll('.gender input')
      for (let i = 0; i < inps.length; i++) {
        if (inps[i].checked) {
          this.updateObj.sex = inps[i].value
        }
      }
    },
    async updateUser () {
      const res = await updateUser(this.updateObj.nickname, this.updateObj.email, this.updateObj.sex, this.updateObj.birthday)
      console.log(res)
    },
    async emailValidation () {
      console.log('修改密码，获取验证码')
      const res = await emailValidation()
      console.log(res)
    },
    async updatePwd () {
      console.log('修改密码')
      const res = await updatePwd(this.pwd.oldPwd, this.pwd.newPwd, this.pwd.rePwd, this.pwd.code)
      console.log(res)
      if (res.data.code === 0) {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
      } else if (res.data.code === 1) {
        alert(res.data.message)
      }
    }
  }
}
</script>

<style lang="less" src="@/styles/user/body.less"></style>
