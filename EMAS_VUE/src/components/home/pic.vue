<template>
  <div class="pic">
    <div class="bg">
      <div class="title">
      <span class="lg-title">情感分析日记</span><br><br>
      <span class="sm-title">Sentiment analysis diary application</span>
    </div>
    <div class="btns">
      <!-- <button class="btn-left">开始对话</button> -->
      <!-- <button class="btn-right">Login</button> -->
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homePic'
}
</script>

<style lang="less" scoped>
.pic {
  background-color: #fff;

  .bg {
  // z-index: 1;
  position: relative;
  // top: -500px;
  height: 730px;
  background: url('../../assets/home/pic/homeBg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  // background-position: center center;
  background-attachment: fixed;
  // 适当裁剪背景图
  clip-path: polygon(0% 0%, 100% 0%, 100% 610px, 1200px 100%, 0% 670px);

  .title {
    position: relative;
    width: 480px;
    height: 100px;
    top: 260px;
    left: 1000px;
    font-weight: 700;
    .lg-title {
      color: #eee;
      font-size: 80px;
    }
    .sm-title {
      position: absolute;
      font-size: 20px;
      left: 60px;
    }
  }

  .btns {
    position: relative;
    width: 360px;
    height: 60px;
    top: 300px;
    left: 1060px;
  }
  .btns button {
    margin: 0 20px;
    cursor: pointer;
    width: 140px;
    height: 60px;
    // border-radius: 10px;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 2px;
  }
  .btn-left {
    background: linear-gradient(to right bottom, rgb(192, 232, 255), rgb(135, 142, 235)) no-repeat;
    border: 0;
    color: #fff;
  }
  .btn-right {
    background: none;
    border: 2px solid rgb(40, 17, 255);
    color: rgb(34, 67, 253);
  }
  .btn-right:hover {
    transition: 1s;
    border: 2px solid rgb(40, 17, 255);
    background-color: rgb(40, 17, 255);
    color: #fff;
  }
}
}
</style>
