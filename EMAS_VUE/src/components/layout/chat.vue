<template>
  <div class="myBody">
    <!-- 标签 -->
    <div class="navTech">
      <span>在孤独的迷宫中徘徊···
        <span class="Oboprint"></span>
        <span style="color: rgb(0, 40, 255);">_</span>
      </span>
    </div>
    <!-- 过去输入内容 -->
    <section class="inpAgo">
      <div class="exchanges-round">
        <!-- <div class="emo-question">
          {{ inp ? inp : '测试内容'}}
        </div>
        <div class="logo-answer">情绪分析助手</div>
        <div class="smart-answer">
          {{ oup ? oup : '测试内容' }}
        </div> -->
      </div>
    </section>
    <section class="inpSec">
      <!-- 上传文件 -->
      <input type="file" id="imageInput" style="display: none;" accept="image/*">
      <input type="file" id="voiceInput" style="display: none;" accept="audio/*">
      <!-- 图片 - 语音 -->
      <div class="otherInp">
        <label for="imageInput"><i class="el-icon-camera imgInp">&nbsp;图片</i></label>
        &nbsp;&nbsp;
        <label for="voiceInput"><i class="el-icon-headset voiceInp">&nbsp;音频</i></label>
        <button class="clearBtn" @click="cancelUploadFile">取消上传文件</button>
      </div>
      <!-- 底部搜索框 -->
      <div class="bottomSearch">
        <!-- 文字输入 -->
        <textarea v-model="inp" type="text" placeholder="在此输入您想询问的内容，Enter发送"></textarea>
        <button class="submitBtn" type="submit" @click="inpTxtShow">&#8629;</button>
        <!-- <button class="submitBtn" type="submit" @click="inpTxtShow">&#8629;</button> -->
      </div>
      <span>内容由 情绪分析日记 生成，仅供您参考</span>
    </section>
  </div>
</template>

<script>
import { EventBus } from '@/utils/eventBus'
import { scrollToBottom, Oboprint, inpTxtShow, listResShow } from '@/utils/layout/chat.js'
export default {
  name: 'layoutChat',
  data () {
    return {
      inp: '',
      oup: '',
      image: null,
      audio: null,
      file: null
    }
  },
  props: {
    listArr: []
  },
  mounted () {
    scrollToBottom()
    Oboprint()
    // 监听所有input的change事件
    const inps = document.querySelectorAll('input')
    for (let i = 0; i < inps.length; i++) {
      inps[i].addEventListener('change', () => {
        // console.log(event.target.files[0].name)
        this.file = event.target.files[0]
        if (this.file) {
          document.querySelector('.clearBtn').style.display = 'inline-block'
          this.inp = `已选择文件 ${event.target.files[0].name}`
          document.querySelector('textarea').readOnly = true
        } else {
          alert('选择文件失败')
        }
      })
    }
    // 历史记录
    EventBus.$on('custom-event', this.handleCustomEvent)
  },
  beforeDestroy () {
    EventBus.$off('custom-event', this.handleCustomEvent)
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
    async inpTxtShow () {
      const res = await inpTxtShow(this.file, this.inp, this.oup)
      const inpAgo = document.querySelector('.inpAgo')
      if (res) {
        inpAgo.innerHTML += res
        this.inp = ''
        this.file = null
        document.querySelector('.clearBtn').style.display = 'none'
      }
    },
    cancelUploadFile () {
      this.file = null
      this.inp = ''
      document.querySelector('.clearBtn').style.display = 'none'
    },
    handleCustomEvent () {
      console.log('Custom event triggered in ComponentB')
      // Do something here
      show()
      async function show () {
        await listResShow()
      }
    }
  }
}
</script>

<style lang="less" src="@/styles/layout/chat.less"></style>
