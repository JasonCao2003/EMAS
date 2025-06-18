<template>
  <div id="app">
    <input type="file" @change="handleFileChange" />
    <button @click="uploadAvatar">上传头像</button>
    <button @click="getUser">getUser</button>
    <button @click="update">update</button>
    <button @click="updatePwd">updatePwd</button>

    <video id="video" autoplay playsinline></video>
    <canvas id="canvas"></canvas>
    <button type="submit" id="logBtn">发送faceRecord</button>

    <button id="startBtn">startBtn</button>
    <button id="stopBtn">stopBtn</button>
    <button id="uploadBtn">uploadBtn</button>

    <img width="200px" height="200px" src="https://emas.oss-cn-beijing.aliyuncs.com/8bc37212-409d-47c5-9e8a-7060c387b3f3.jpg" alt="">

    <!-- <button @click="getRandomArticles">getRandomArticles</button> -->
  </div>
</template>

<script>
// import getUser from '@/api/user.js'
import axios from 'axios'
export default {
  name: 'textIndex',
  data () {
    return {
      file: null // 保存选择的文件
    }
  },
  methods: {
    // 处理文件选择事件
    handleFileChange (event) {
      const selectedFile = event.target.files[0]
      if (selectedFile) {
        this.file = selectedFile
      } else {
        this.file = null
      }
    },
    // 上传文件
    async uploadAvatar () {
      if (!this.file) {
        alert('请先选择一个文件！')
        return
      }
      const formData = new FormData()
      formData.append('image', this.file) // 后端接收的字段名为 "image"
      const response = await axios.post('/record/faceRecord', formData
      )
      alert(response.data.message)
      console.log(response)
    },
    async getUser () {
      const userMsg = await axios.post('/user/getUser')
      console.log(userMsg)
    },
    async update () {
      const userMsg = await axios.post('/user/update',
        {
          nickname: 'laiyufan',
          email: '1411331445@qq.com',
          sex: '男',
          birthday: '2003-05-07'

        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token')
          }
        })
      console.log(userMsg)
    },
    async updatePwd () {
      const userPwd = await axios.post('/user/updatePwd',
        {
          oldPwd: '654321',
          newPwd: '633333',
          rePwd: '633333',
          code: '7808'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token')
          }
        })
      console.log(userPwd)
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    }
    // aysnc emailLogin () {
    //   const emailLogin = await axios.post('http://localhost:8080/login/emailLogin',
    //       {
    //         email: '1411331445@qq.com'
    //       }
    //     )
    // }
  },
  mounted () {
    console.log('人脸登录中。。。')
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
        axios.post('/record/faceRecord', formData)
          .then(result => {
            console.log('Image uploaded successfully', result)
          })
          .catch(error => {
            console.error('Error uploading image', error)
          })
      }, 'image/jpeg')
    })

    console.log('录入声音')
    const startButton = document.querySelector('#startBtn')
    const stopButton = document.querySelector('#stopBtn')
    // const uploadButton = document.querySelector('#uploadBtn')
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
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
          const audio = new FormData()
          audio.append('audio', audioBlob, 'recording.wav')

          // 使用axios发送音频数据到后端
          axios.post('/login/voiceLogin', audio)
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
}

</script>

<style scoped>
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
