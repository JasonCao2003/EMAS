<template>
  <!-- 左侧导航栏 -->
  <div class="nav">
    <!-- 网站logo -->
    <div class="webName"><img src="@/assets/layout/nav/navLogo.png" alt=""></div>
    <!-- 选项卡 -->
    <div class="selectCard">
      <router-link to="/"><div class="everyCard homeIndex"><img title="首页" src="@/assets/layout/nav/homeIndex.jpg"><span>首页</span></div></router-link>
      <div class="everyCard toWeather"><img title="今日天气" src="@/assets/layout/nav/weatherSearch.png"><span>今日天气</span>
      </div>
      <router-link to="/article"><div class="everyCard teamChat"><img title="为你推荐" src="@/assets/layout/nav/recommend.png"><span>为你推荐</span></div></router-link>
      <!-- 历史记录位于最下方 -->
      <div class="myHistory" @click="listTextRecords"><img src="@/assets/layout/nav/myHistory.png" alt=""><span>历史记录</span></div>
    </div>
    <!-- 最下方信息 -->
    <div class="userMsg">
      <router-link to="/user">
        <div class="msg-footer">
        <div class="userimg"></div>
        <div class="footer-user">
          <span class="username">{{ username }}</span>
          <span class="useremail">{{ useremail }}</span>
        </div>
      </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/utils/eventBus'
export default {
  name: 'layoutNav',
  data () {
    return {
      username: localStorage.getItem('username'),
      useremail: localStorage.getItem('useremail'),
      useravatar: localStorage.getItem('useravatar')
    }
  },
  props: {
    listArr: []
  },
  mounted () {
    document.querySelector('.userimg').style.backgroundImage = `url(${this.useravatar})`
  },
  methods: {
    async listTextRecords () {
      EventBus.$emit('custom-event')
    }
  }
}
</script>

<style lang="less" scoped src="@/styles/layout/nav.less"></style>
