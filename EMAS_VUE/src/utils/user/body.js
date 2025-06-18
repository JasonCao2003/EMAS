import { getLikedArticles, faceRecord, voiceRecord, updateAvatar, getUser, getDailyEmotion, countEmotions } from '@/api/user'
import * as echarts from 'echarts'
/**
 *  主页body - 切换 “主页” & “阅读” & “情绪” & “设置”
 */
// tab栏切换
// ul class="h-select"
export function changeFooter () {
  const lis = document.querySelectorAll('.h-select li')
  const footers = document.querySelectorAll('#footer')
  const sign = document.querySelector('.nth-li')
  const value = localStorage.getItem('h-select')
  if (value) {
    lis.forEach(function (item, index) {
      item.classList.remove('active')
    })
    footers.forEach(function (item, index) {
      item.style.display = 'none'
    })
    lis[value].classList.add('active')
    footers[value].style.display = 'block'
    sign.style.marginLeft = `${value * (30 + 80) + 30}px`
  }
  // console.log(lis)
  for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener('click', () => {
      lis.forEach(function (item, index) {
        item.classList.remove('active')
      })
      footers.forEach(function (item, index) {
        item.style.display = 'none'
      })
      lis[i].classList.add('active')
      footers[i].style.display = 'block'
      localStorage.setItem('h-select', i)
      sign.style.marginLeft = `${i * (30 + 80) + 30}px`
    })
  }
}

/**
 *  “主页body大tab栏” - “阅读”
 */

// 显示收藏的文章
export async function showLikedArticles () {
  const likedArticlesArr = await (await getLikedArticles()).data.data
  // console.log(likedArticlesArr)
  const array = likedArticlesArr
  // 去掉重复的数组
  const uniqueArray = array.reduce((accumulator, currentValue) => {
    const key = JSON.stringify(currentValue)
    if (!accumulator.has(key)) {
      accumulator.set(key, currentValue)
    }
    return accumulator
  }, new Map()).values()
  const arr = [...uniqueArray]
  // 排序
  const artShow = arr.sort((a, b) => a.articleId - b.articleId)
  console.log(artShow)
  if (artShow) {
    for (let i = 0; i < arr.length; i++) {
      const { articleId, summary, title } = artShow[i]
      document.querySelector('.shell tbody').innerHTML +=
        `
                      <tr>
                      <td>${articleId}</td>
                      <td>${summary}</td>
                      <td>${title}</td>
                      <td><p class="readBtn">阅读</p></td>
                    </tr>
      `
    }
  } else {
    document.querySelector('.shell tbody').innerHTML =
    `
                  <tr>
                  <td></td>
                  <td>还没有收藏过文章</td>
                  <td></td>
                  <td></td>
                </tr>
  `
  }

  // 阅读 某一篇文章
  document.addEventListener('click', (event) => {
    if (event.target.className === 'readBtn') {
      // 获取父元素
      const parentElement = event.target.parentElement
      // 获取父元素的父元素
      const grandParentElement = parentElement.parentElement
      console.log(grandParentElement.children[0].innerText)

      for (let i = 0; i < artShow.length; i++) {
        if (String(artShow[i].articleId) === grandParentElement.children[0].innerText) {
          console.log(artShow[i].content)
          document.querySelector('.bookTitle').innerHTML = artShow[i].title
          document.querySelector('.bookContent').innerHTML = artShow[i].content
        }
      }
    }
  })
}

/**
 *  情绪
 */
// 日历 - title时间
export const currentDay = () => {
  const date = new Date()
  const day = date.getDate()
  const monthNum = date.getMonth()
  // 定义一个包含所有英文月份名称的数组
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  // 获取当前月份的英文名称
  const month = months[monthNum]
  return { month, day }
}

// 获取每日情绪
export const getDailEmo = async () => {
  // 从后台获取 每日情绪数据
  const obj = (await getDailyEmotion()).data.data
  // 获取当月 月份
  const date = new Date()
  const currentMonth = date.getMonth() + 1
  // 创建数组
  const arr = []
  for (const [date, emo] of Object.entries(obj)) {
    arr.push({ date, emo })
    // console.log(arr)
  }
  // 过滤出所有12月份的数据
  const currentData = arr.filter(item => {
    const date = item.date // 获取日期部分
    // console.log(date)
    const month = date.split('-')[1] // 获取月份部分
    return month === `${currentMonth}`
  })
  for (let i = 0; i < currentData.length; i++) {
    currentData[i].date = currentData[i].date.split('-')[2]
    // console.log(currentData)
    // const tds = document.querySelectorAll('tbody td')
    // for (let j = 0; j < tds.length; j++) {
    //   if (currentData[i].date === tds[j].innerText) {
    //     tds[j].innerHTML = '111'
    //   }
    // }
  }
  return currentData
}

// 鼠标移入日历中的 day
export const moveinDay = async (day) => {
  const res = await getDailEmo()
  let str = ''
  console.log('选择日期为' + day)
  for (let i = 0; i < res.length; i++) {
    if (res[i].date === day) {
      document.querySelector('.dailyEmoShow').style.display = 'block'
      // console.log(day)
      // console.log(res[i].emo)
      for (let j = 0; j < res[i].emo.length; j++) {
        // console.log(res[i].emo[j])
        const { emotion_count, emotion } = res[i].emo[j]
        console.log(emotion_count, emotion)
        str +=
        `
        <span>${emotion} : </span><span>${emotion_count}</span>
        `
      }
    }
    document.querySelector('.dailyEmoShow').innerHTML = str || '还没有记录'
  }
}

// echarts
export async function echartsShow () {
  // 获取所有数据
  const arr = (await countEmotions()).data.data
  // console.log(arr)
  const emotionArr = []
  const emotionCountArr = []
  for (let i = 0; i < arr.length; i++) {
    const { emotion_count, emotion } = arr[i]
    // console.log(emotion_count, emotion)
    emotionArr.push(emotion)
    emotionCountArr.push(emotion_count)
  }
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById('main'))
  // 绘制图表
  myChart.setOption({
    title: {
      text: '情绪分布'
    },
    tooltip: {},
    xAxis: {
      data: emotionArr
    },
    yAxis: {},
    series: [
      {
        name: '情绪值',
        type: 'bar',
        data: emotionCountArr
      }
    ]
  })
}

/**
 *  设置栏 - 切换 “我的信息” & “我的头像” & “账号安全”
 */

// tab栏切换
// ul class="setting-select"
export function changeSettingSelect () {
  const lis = document.querySelectorAll('.setting-select li')
  const footers = document.querySelectorAll('#my-setting')
  const value = localStorage.getItem('setting-select')
  if (value) {
    lis.forEach(function (item, index) {
      item.classList.remove('li-active')
    })
    footers.forEach(function (item, index) {
      item.style.display = 'none'
    })
    lis[value].classList.add('li-active')
    footers[value].style.display = 'block'
  }
  // console.log(lis)
  for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener('click', () => {
      lis.forEach(function (item, index) {
        item.classList.remove('li-active')
      })
      footers.forEach(function (item, index) {
        item.style.display = 'none'
      })
      lis[i].classList.add('li-active')
      footers[i].style.display = 'block'
      localStorage.setItem('setting-select', i)
    })
  }
}

/**
 *  “设置” - “我的信息”
 */

// 日期选择器 - 限制日期最晚为当天
export function inputDate () {
  const dateInput = document.getElementById('dateInput')
  const today = new Date().toISOString().split('T')[0] // Get today's date in YYYY-MM-DD format
  dateInput.setAttribute('max', today) // Set the maximum date to today
}

// 获取信息
export const getUserMsg = async () => {
  const res = await getUser()
  const dateTimeString = res.data.data.birthday

  const dateObj = new Date(dateTimeString)
  // 获取年份、月份和日期
  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0') // 月份从0开始，所以需要加1
  const day = String(dateObj.getDate()).padStart(2, '0')
  // 拼接成所需的格式
  const dateString = `${year}-${month}-${day}`
  res.data.data.birthday = dateString

  // 设置 性别
  const inps = document.querySelectorAll('.gender input')
  const sex = res.data.data.sex
  for (let i = 0; i < inps.length; i++) {
    if (sex === inps[i].value) {
      inps[i].checked = true
    }
  }

  return res.data.data
}

/**
 *  “设置” - “我的头像”
 */

// 更换头像 - 控制页面显示和隐藏s
export function changeAvater () {
  const avaterBtn = document.querySelector('.avaterBtn')
  const imgShow = document.querySelector('.img-show')
  const imgChange = document.querySelector('.img-change')
  avaterBtn.addEventListener('click', () => {
    imgShow.style.display = 'none'
    imgChange.style.display = 'block'
  })
}

// 处理文件选择事件
export function handleFileChange (file) {
  const selectedFile = file.target.files[0]
  console.log(file)

  if (selectedFile) {
    this.file = selectedFile
    const rd = new FileReader()
    rd.readAsDataURL(selectedFile)
    rd.onloadend = function (e) {
      // 加载完毕之后获取结果赋值给img
      document.querySelector('#currentAvater').src = this.result
      console.log(this.result)
    }
  } else {
    this.file = null
  }
}

// 上传 头像图片
export async function uploadAvatar () {
  if (!this.file) {
    alert('请先选择一个文件！')
    return
  }
  const formData = new FormData()
  formData.append('image', this.file) // 后端接收的字段名为 "image"
  await updateAvatar(formData)
  const res = await getUser()
  localStorage.removeItem('useravatar')
  localStorage.setItem('useravatar', res.data.data.avatar)
  location.reload()
}

/**
 *  “设置” - “账号安全”
 *  修改 页面的显隐
 */
export function safeLink () {
  safeLinkNone()
  const links = document.querySelectorAll('.safe-link')
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', () => {
      // console.log(links[i].id)
      const linkDiv = document.getElementById(`${links[i].id}Div`)
      linkDiv.style.display = 'block'
    })
  }
}

// 清除所有 修改页面 的display: block
export function safeLinkNone () {
  // 清除 方法
  function displayNone () {
    const changeDivs = document.querySelectorAll('.changeDiv')
    for (let i = 0; i < changeDivs.length; i++) {
      changeDivs[i].style.display = 'none'
    }
  }
  // 点击账号安全去除所有 changeDiv
  document.querySelector('.accountSafeLi').addEventListener('click', () => {
    displayNone()
  })
  // 点击 取消 按钮返回 “账号安全” 页面
  const cancelBtns = document.querySelectorAll('.cancelChangeBtn')
  for (let i = 0; i < cancelBtns.length; i++) {
    cancelBtns[i].addEventListener('click', () => {
      displayNone()
    })
  }
}

/**
 *  “设置” - “账号安全” - “修改人脸信息”
 */
export const openVideo = (video) => {
  // 获取用户媒体设备（摄像头）
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream
    })
    .catch(error => {
      console.error('Error accessing the camera', error)
    })
}
export const faceUpdate = () => {
  const video = document.querySelector('#video')
  const canvas = document.querySelector('#canvas')
  const context = canvas.getContext('2d')

  document.querySelector('#faceChange').addEventListener('click', () => {
    openVideo(video)
  })

  document.querySelector('#sendfaceUpdate').addEventListener('click', () => {
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    canvas.toBlob(async (blob) => {
      const formData = new FormData()
      formData.append('image', blob, 'photo.jpg')

      // 使用axios发送图片数据到后端
      const res = await faceRecord(formData)
      console.log(res)
    }, 'image/jpeg')
  })
}

/**
 *  “设置” - “账号安全” - “更新声纹信息”
 */

export const voiceUpdate = () => {
  // console.log('录音功能开始工作')
  const startButton = document.querySelector('#startBtn')
  const stopButton = document.querySelector('#stopBtn')
  const audioChunks = []
  let mediaRecorder
  let dis = 0

  document.querySelector('#voiceChange').addEventListener('click', () => {
    // 获取用户媒体设备（麦克风）
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorder = new MediaRecorder(stream)

        mediaRecorder.ondataavailable = event => {
          if (event.data.size > 0) {
            audioChunks.push(event.data)
          }
        }

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
          const audio = new FormData()
          audio.append('audio', audioBlob, 'recording.wav')

          const audioUrl = URL.createObjectURL(audioBlob)
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = audioUrl
          a.download = 'recording.wav'
          document.body.appendChild(a)
          a.click()
          setTimeout(() => {
            document.body.removeChild(a)
            URL.revokeObjectURL(audioUrl)
          }, 100)

          // 使用axios发送音频数据到后端
          const res = await voiceRecord(audio)
          console.log(res)
        }
      })
      .catch(error => {
        console.error('Error accessing the microphone', error)
      })
  })

  startButton.addEventListener('click', () => {
    if (dis !== 0) {
      return alert('重复录制，请先停止录制并提交')
    }
    audioChunks.length = 0 // 清空之前的录音数据
    console.log(mediaRecorder)
    dis = 1
    mediaRecorder.start()
    console.log('Recording started')
  })

  stopButton.addEventListener('click', () => {
    mediaRecorder.stop()
    console.log('Recording stopped')
    dis = 0
  })
}
