<template>
  <div class="intr">
    <div class="title">
      <div class="main">智能情感分析助手</div>
      <div class="mid">Beta</div><br>
      <div class="smart">通过分析日记中的文字图片声音，帮助用户记录日常情绪_</div>
    </div>
    <div class="content">
      <div class="contentBg"></div>
      <div class="contentTxt">
        <div class="txt">
          <h1>智能分析</h1>
          <div class="adv">
            <span style="font-weight: 600; font-size: 18px;">√</span>&nbsp;
            <span style="font-size: 24px;">快速反应</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span style="font-size: 14px;">根据大量的数据源实现多种方式快速分析用户情感</span>
          </div>
          <div class="adv">
            <span style="font-weight: 600; font-size: 18px;">√</span>&nbsp;
            <span style="font-size: 24px;">准确分析</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span style="font-size: 14px;">不断地训练模型和优化算法，从而提高任务处理的准确性</span>
          </div>
          <div class="adv">
            <span style="font-weight: 600; font-size: 18px;">√</span>&nbsp;
            <span style="font-size: 24px;">时刻陪伴</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span style="font-size: 14px;">提供更加个性化的用户体验，增强用户满意度</span>
          </div>
        </div>
        <div class="next">&gt;</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeIntr'
}
</script>

<style lang="less" scoped>
.intr {
  position: relative;
  height: 700px;
  background-color: #fff;

  .title {
    line-height: 50px;
    width: 1000px;
    height: 160px;
    padding: 50px 240px 0 240px;

    .main {
      height: 50px;
      position: relative;
      float: left;
      font-size: 40px;
      font-weight: 700;
      letter-spacing: 4px;
    }

    .mid {
      position: relative;
      float: left;
      padding: 10px 12px;
      width: 120px;
      height: 50px;
      background: linear-gradient(to right, rgb(227, 135, 235), #fff) no-repeat;
      background-position: 0 14px;
      background-size: 70% 100%;
      clip-path: polygon(12% 0, 100% 0, 80% 100%, 0 100%);
      color: purple;
      font-style: italic;
      font-size: 30px;
    }

    .smart {
      position: relative;
    }
  }

  .content {
    position: relative;
    padding: 20px 0;
    width: 1180px;
    height: 500px;
    left: 50%;
    transform: translate(-45%, 0);

    .contentBg {
      position: relative;
      float: left;
      width: 420px;
      height: 400px;
      border-radius: 30px;
      background: url(../../assets/home/intr/contentBg.jpeg) no-repeat;
      clip-path: polygon(0 0, 100% 0, 100% 30px, 80% 100%, 0 100%);
      background-size: cover;
      background-position: center center;
    }

    .contentTxt {
      background: url(../../assets/home/intr/txtBg.jpeg) no-repeat;
      border-radius: 0 20px 20px 0;
      background-size: cover;
      background-position: left center;
      z-index: -1;
      position: relative;
      float: left;
      top: 30px;
      left: -106px;
      width: 760px;
      height: 370px;

      .next {
        position: absolute;
        width: 80px;
        height: 50px;
        background-color: pink;
        right: 0;
        bottom: 0;
        border-radius: 20px 0 20px 0;
        text-align: center;
        align-content: center;
        font-size: 30px;
        color: #fff;
        cursor: pointer;
      }
      .next:hover {
        transition: 0.8s;
        font-weight: 600;
        background-color: rgb(255, 151, 168);
      }

      .txt {
        padding: 30px 130px;
        background-color: (rgba(255, 255, 255, 0.3));
        position: relative;
        width: 800px;
        height: 370px;

        h1 {
          color: #fff;
        }

        .adv {
          margin: 30px 0;
          height: 40px;
          font-size: 26px;
          align-content: center;
          border-bottom: 1px solid skyblue;
          color: #333;
        }
      }

    }

  }
}
</style>
