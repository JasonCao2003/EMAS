<template>
  <div class="sidebar-all">
    <div @click="sidebarHide" class="blur" :style="{ display: sidebarIsShow }">
      <div class="card-body">
        <div class="cards">
          <!-- <div class="card">测试内容</div>
          <div class="card">测试内容</div>
          <div class="card">测试内容</div>
          <div class="card">测试内容</div>
          <div class="card"><img src="../../assets/article/sidebar/sakura.jpg" alt=""></div>
          <div class="card">测试内容</div>
          <div class="card">测试内容</div>
          <div class="card">测试内容</div>
          <div class="card">测试内容</div>
          <div class="card"><img src="../../assets/article/sidebar/sakura.jpg" alt=""></div>
          <div class="card">测试内容</div>
          <div class="card">测试内容</div>
          <div class="card">测试内容</div>
          <div class="card">测试内容</div>
          <div class="card"><img src="../../assets/article/sidebar/sakura.jpg" alt=""></div>
          <div class="card">测试内容</div>
          <div class="card">测试内容</div>
          <div class="card">测试内容</div>
          <div class="card">测试内容</div>
          <div class="card"><img src="../../assets/article/sidebar/sakura.jpg" alt=""></div>
          <div class="card">测试内容</div>
          <div class="card">测试内容</div>
          <div class="card">测试内容</div>
          <div class="card">测试内容</div> -->
        </div>
      </div>
    </div>
    <div class="sidebar" :style="{ left: leftShow }">
      <nav class="sidebar-title">Emotional diary</nav>
      <ul class="sidebar-ul">
        <li><i class="el-icon-message-solid" style="font-size: 24px;"><i class="el-icon-badge">{{ newNum }}</i></i></li>
        <router-link to="/">
          <li>首页</li>
        </router-link>
        <router-link to="/chat">
          <li>对话</li>
        </router-link>
        <router-link to="/user">
          <li>个人空间</li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { scrollArticles } from '@/utils/article/sidbar'
export default {
  name: 'articleSidebar',
  props: ['sidebarIsShow', 'leftShow', 'topShow'],
  data () {
    return {
      newNum: 12
    }
  },
  mounted () {
    scrollArticles()
    // document.querySelector('.img').style.backgroundImage = random(this.picArr)
  },
  methods: {
    sidebarHide (event) {
      if (event.target.className !== 'card') {
        this.$emit('sidebarShowDisplay')
      }
    }
  }
}
</script>

<style lang="less">
.sidebar-all {
  // display: none;
  transition: 0.9s;
  position: absolute;
  width: 100%;
  height: 100%;

  .blur {
    display: none;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(2px);
    background: rgba(50, 50, 50, 0.2);
    position: absolute;
    flex-direction: column;
    z-index: 1;
    overflow: hidden;

    .card-body {
      position: relative;
      left: 240px;
      min-block-size: 100%;
      width: calc(100% - 240px);
      height: 100%;
      overflow-y: scroll;
      // display: grid;
      place-content: center;
      /*  设置上下内边距为 30% 的视图高度 */;
      padding-block: 30vh;
      // background: #f7d6ff;
      @keyframes slide-fade-in {
        from {
          opacity: 0;
          box-sizing: none;
          transform: scale(.8) translateY(25vh);
        }
      }

      .cards {
        position: relative;
        padding: 0 300px;
        display: grid;
        gap: 2em;
        /* 自动排列 */
        grid-auto-flow: dense;
        grid-template-columns: repeat(4, 20ch);

        .card {
          text-align: center;
          padding: 30px 20px;
          cursor: pointer;
          animation: slide-fade-in both;
          /* 使用浏览器的视图时间线，允许动画根据视口的变化进行同步 */
          animation-timeline: view();
          animation-range: contain 0% contain 30%;
          border-radius: 10px;
          // line-height: 6;
          box-shadow: 0px 8px 20px #00000022;
          font-size: 16px;
          letter-spacing: 3px;
          color: #ececec;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-image: linear-gradient(to bottom right,
              rgba(168, 168, 168, 0.4),
              rgba(138, 138, 138, 0.5),
              rgba(100, 100, 100, 0.6),
              rgba(43, 43, 43, 0.7),
              rgba(32, 32, 32, 0.8));
          display: flex;
          justify-content: center;
          align-items: center;

          .img {
            width: 100%;
            height: 100%;
            min-height: 120px;
            background-repeat: no-repeat;
            background-size: cover;
          }
        }

        .card:nth-of-type(4n) {
          grid-column: span 2;
        }

        .card:nth-of-type(5n) {
          grid-column: span 2;
        }

        .card:nth-of-type(7n) {
          grid-row: span 2;
        }
      }
    }

  }

  .sidebar {
    transition: 0.9s;
    left: -240px;
    position: absolute;
    float: left;
    width: 240px;
    height: 100%;
    background-color: #f3f3f3;
    z-index: 2;

    .sidebar-title {
      position: relative;
      width: 100%;
      height: 66px;
      padding-top: 20px;
      padding-left: 30px;
      color: #000;
      font-size: 20px;
    }

    .sidebar-ul {
      li {
        cursor: pointer;
        color: #757575;
        width: 100%;
        height: 56px;
        padding: 16px 40px;
        font-size: 14px;

        .el-icon-badge {
          --height: 20px;
          height: 20px;
          color: #fff;
          font-size: 12px;
          padding: 2px;
          background-color: deeppink;
          border-radius: var(--height);
          align-content: center;
          text-align: center;
          position: relative;
          top: -15px;
          right: 10px;
        }
      }

      li:hover {
        background-color: #ddd;
      }
    }
  }
}
</style>
