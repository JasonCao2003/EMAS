<template>
  <!-- 用户内容 -->
  <div class="myMsg">
    <!-- 标题 -->
    <div class="title">个人空间</div>
    <!-- 柱状图 -->
    <div id="emoCharts"></div>
  </div>
</template>

<script>
import dyEchart from '@/utils/myMsg.js'
export default {
  name: 'layoutMsg',
  mounted () {
    dyEchart()
  }
}
</script>

<style lang="less" scoped>
/* 用户内容 */
.myMsg {
  background-color: #fff;
  position: absolute;
  top: 2%;
  left: 78%;
  width: 20%;
  height: 900px;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 20px 0;

  // 标题
  .title {
    position: relative;
    left: 20px;
    color: blue;
    font-size: 18px;
    font-weight: 600;
    height: 24px;
  }

  /* 图 */
  #emoCharts {
    width: 100%;
    height: 400px;
  }
}
</style>
