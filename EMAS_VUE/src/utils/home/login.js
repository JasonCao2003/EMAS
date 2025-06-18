import axios from 'axios'
import { accountLogin, emailLogin, getUser } from '@/api/login'
// tip提示框
function tipShow () {
  document.querySelector('.tip span').style.top = '0px'
  document.querySelector('.tip span').style.opacity = '1'
  setTimeout(() => {
    document.querySelector('.tip span').style.top = '80px'
    document.querySelector('.tip span').style.opacity = '0'
  }, 2000)
}
// 取消登录
function ucancel () {
  this.$emit('updateVisible', false)
}
// 登陆方式切换
function switchLogin () {
  const inps = document.querySelectorAll('.nav-inp, .each-login span')
  const ubds = document.querySelectorAll('.ubody')
  const regBtn = document.querySelector('#regBtn')
  ubds[0].style.display = 'block'
  for (let i = 0; i < inps.length; i++) {
    inps[i].addEventListener('click', () => {
      // 限制注册功能
      if (i !== 0) {
        regBtn.disabled = 'disabled'
        regBtn.style.cursor = 'not-allowed'
        regBtn.title = '除密码外，暂不支持其他方式注册'
      } else {
        regBtn.disabled = ''
        regBtn.style.cursor = 'pointer'
      }
      document.querySelector('.active').classList.remove('active')
      inps[i].classList.add('active')
      for (let j = 0; j < ubds.length; j++) {
        ubds[j].style.display = 'none'
      }
      ubds[i].style.display = 'block'
    })
  }
}

// 获取验证码,这是定时器
function getCodePrevent () {
  // 当目前没有定时器开着，且 totalSecond 和 second 一致 (秒数归位) 才可以倒计时
  if (!this.codeTimer && this.second === this.totalSecond) {
    // 开启计时器
    this.codeTimer = setInterval(() => {
      this.second--
      // 清除定时器
      if (this.second <= 0) {
        clearInterval(this.codeTimer)
        this.codeTimer = null // 重置定时器id
        this.second = 60 // 归位
      }
    }, 1000)
  }
}

/**
 *  整合 账号 + 密码登录 & 邮箱 + 验证码登录 & 人脸登录 & 声纹登录
 */
export const uniteLogin = async (username, password, email, code) => {
  if (username) {
    console.log('密码登录')
    const res = await accountLogin(username, password)
    return res
  } else if (email) {
    console.log('邮箱登录')
    const res = await emailLogin(email, code)
    return res
  }
}

// 人脸登录
function faceLogin () {
  console.log('人脸登录')
  const video = document.querySelector('#video')
  const canvas = document.querySelector('#canvas')
  const context = canvas.getContext('2d')
  const captureButton = document.querySelector('#logBtn')

  // 获取用户媒体设备（摄像头）
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream
    })
    .catch(error => {
      console.error('Error accessing the camera', error)
    })

  captureButton.addEventListener('click', () => {
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    canvas.toBlob((blob) => {
      const formData = new FormData()
      formData.append('image', blob, 'photo.jpg')

      // 使用axios发送图片数据到后端
      axios.post('/login/faceLogin', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(async (response) => {
          console.log('Image uploaded successfully', response)
          localStorage.setItem('token', response.data.data)
          const msg = await getUser()
          console.log(msg.data.data)
          localStorage.setItem('username', msg.data.data.username)
          localStorage.setItem('useremail', msg.data.data.email)
          localStorage.setItem('useravatar', msg.data.data.avatar)
          location.reload()
        })
        .catch(error => {
          console.error('Error uploading image', error)
          return alert('登陆失败，请重试')
        })
    }, 'image/jpeg')
  })
}

function voiceLogin () {
  console.log('声纹登录中')
  const startButton = document.querySelector('#startBtn')
  const stopButton = document.querySelector('#stopBtn')
  const audioChunks = []
  let mediaRecorder

  // 获取用户媒体设备（麦克风）
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream)

      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          audioChunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' })
        const audio = new FormData()
        audio.append('audio', audioBlob, 'speaker1.mp3')

        const audioUrl = URL.createObjectURL(audioBlob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = audioUrl
        a.download = 'speaker1.mp3'
        document.body.appendChild(a)
        a.click()
        setTimeout(() => {
          document.body.removeChild(a)
          URL.revokeObjectURL(audioUrl)
        }, 100)

        // 使用axios发送音频数据到后端
        axios.post('/login/voiceLogin', audio, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(result => {
            console.log('Audio uploaded successfully', result)
          })
          .catch(error => {
            console.error('Error uploading audio', error)
          })
      }
    })
    .catch(error => {
      console.error('Error accessing the microphone', error)
    })

  startButton.addEventListener('click', () => {
    audioChunks.length = 0 // 清空之前的录音数据
    mediaRecorder.start()
    console.log('Recording started')
  })

  stopButton.addEventListener('click', () => {
    mediaRecorder.stop()
    console.log('Recording stopped')
  })
}

// 监听器 - 监听输入内容
function handler (newValue) {
  if (this.matchTimer) clearTimeout(this.matchTimer)
  this.matchTimer = setTimeout(async () => {
    const address = newValue.email
    const getCode = document.querySelector('.getCode')
    const reg = /^[1-9][0-9]{4,10}@qq.com$/
    // console.log(reg.test(address))
    // console.log(address)
    if (reg.test(address)) {
      getCode.style.color = 'skyblue'
      getCode.style.cursor = 'pointer'
      getCode.disabled = false
    } else {
      getCode.style.color = '#ddd'
      getCode.style.cursor = 'not-allowed'
      getCode.disabled = true
    }
  }, 1000)
}
export { tipShow, ucancel, switchLogin, getCodePrevent, faceLogin, voiceLogin, handler }
