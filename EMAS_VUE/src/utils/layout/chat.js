import {
  // 引入上传api
  textRecord, faceRecord, voiceRecord,
  // 引入历史记录api
  listTextRecords, listFaceRecords, listVoiceRecords
} from '@/api/chat.js'
// 段落逐字打印 - 定时器
function Oboprint () {
  const textElement = document.querySelector('.Oboprint')
  let index = 0
  const fullText = '不如让心灵之声被倾听'

  // 段落逐字打印
  function typeWriter () {
    if (index < fullText.length) {
      textElement.innerHTML += fullText.charAt(index)
      index++
      setTimeout(typeWriter, 100) // 调整速度，单位为毫秒
    }
  }
  typeWriter()

  setInterval(() => {
    textElement.innerHTML = ''
    index = 0
    typeWriter()
  }, 5000)
}

// 滚动始终在最下方
function scrollToBottom () {
  const scrollableDiv = document.querySelector('.inpAgo')
  scrollableDiv.scrollTop = scrollableDiv.scrollHeight
  // 页面加载完成后滚动到底部
  window.onload = scrollToBottom
}

// 文本输入 渲染
async function inpTxtShow (file, inp, oup) {
  if (!file) {
    if (inp) {
      const res = await textRecord(inp)
      // console.log(res)
      oup = res.data.data || res.data.message
      const str = `
          <div class="exchanges-round">
            <div class="emo-question">
            ${inp}
            </div>
            <div class="logo-answer">情绪分析助手</div>
            <div class="smart-answer">
            ${oup}
            </div>
          </div>
      `
      return str
    } else {
      alert('你还没有输入')
    }
  } else {
    const type = file.type.split('/')[0]
    // console.log(type)
    if (type === 'image') {
      const formData = new FormData()
      formData.append('image', file)
      console.log(file)
      const res = await faceRecord(formData)
      console.log(res)
      oup = res.data.data || res.data.message
      const str = `
          <div class="exchanges-round">
            <div class="emo-question">
            ${inp}
            </div>
            <div class="logo-answer">情绪分析助手</div>
            <div class="smart-answer">
            ${oup}
            </div>
          </div>
      `
      return str
    } else if (type === 'audio') {
      const formData = new FormData()
      formData.append('audio', file)
      // console.log(file)
      const res = await voiceRecord(formData)
      console.log(res)
      oup = res.data.data || res.data.message
      const str = `
          <div class="exchanges-round">
            <div class="emo-question">
            ${inp}
            </div>
            <div class="logo-answer">情绪分析助手</div>
            <div class="smart-answer">
            ${oup}
            </div>
          </div>
      `
      return str
    }
  }
}

// 预留 历史记录
export const listResShow = async () => {
  // 将历史记录融合到一个数组之中
  const listArr = []
  const listText = (await listTextRecords()).data.data
  for (let i = 0; i < listText.length; i++) {
    listArr.push(listText[i])
  }
  const listFace = (await listFaceRecords()).data.data
  for (let i = 0; i < listFace.length; i++) {
    listArr.push(listFace[i])
  }
  const listVoice = (await listVoiceRecords()).data.data
  for (let i = 0; i < listVoice.length; i++) {
    listArr.push(listVoice[i])
  }
  console.log(listArr)
  // innerHTML
  let str = ''
  for (let i = 0; i < listArr.length; i++) {
    const { faceImgstr, text, emotion } = listArr[i]
    if (text) {
      const inp = text
      const oup = emotion
      str = `
        <div class="exchanges-round">
          <div class="emo-question">
          ${inp}
          </div>
          <div class="logo-answer">情绪分析助手</div>
          <div class="smart-answer">
          ${oup}
          </div>
        </div>
      `
      console.log(str)
      const inpAgo = document.querySelector('.inpAgo')
      inpAgo.innerHTML += str
    } else if (faceImgstr) {
      const inp = faceImgstr
      const oup = emotion
      str = `
        <div class="exchanges-round">
          <div class="emo-question">
            <a href=" ${faceImgstr} ">${inp}</a>
          </div>
          <div class="logo-answer">情绪分析助手</div>
          <div class="smart-answer">
          ${oup}
          </div>
        </div>
      `
      console.log(str)
      const inpAgo = document.querySelector('.inpAgo')
      inpAgo.innerHTML += str
    }
  }
}
// function historyShow () {
//   const goodsList = [
//     {
//       inp: '',
//       oup: ''
//     }
//   ]
//   // 1. 根据数据渲染页面
//   document.querySelector('.inpAgo').innerHTML = goodsList.map(item => {
//     // 对象解构
//     const { inp, oup } = item

//     return `
//       <div class="exchanges-round">
//         <div class="emo-question">
//         ${inp}
//         </div>
//         <div class="logo-answer">情绪分析助手</div>
//         <div class="smart-answer">
//         ${oup}
//         </div>
//       </div>
//         `
//   }).join('')
// }

export { scrollToBottom, Oboprint, inpTxtShow }
