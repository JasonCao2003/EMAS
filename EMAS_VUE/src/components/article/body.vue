<template>
  <div class="body">
    <div class="art-title-rec">
      <div class="border-left">『</div>
      <div class="innerArea">
        <div class="art-content-rec"></div>
        <div class="art-content-author">—— </div>
      </div>
      <div class="border-right">』</div>
    </div>
    <button class="feedback">❤</button>
  </div>
</template>

<script>
import { summaryShow } from '@/utils/article/body.js'
export default {
  name: 'articleBody',
  data () {
    return {
    }
  },
  mounted () {
    // location.reload()
    summaryShow()
  }
}
</script>

<style lang="less" src="@/styles/article/body.less"></style>
