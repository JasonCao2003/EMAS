<template>
  <div class="nav">
    <i @click="sidebarShow" class="el-icon-s-unfold"></i>
    <span class="art-title">Emotional diary</span>
    <nav class="article-all-icon">
      <i class="el-icon-message-solid"><i class="el-icon-badge">{{ newNum }}</i></i>
      <router-link to="/"><span class="home-link">首页</span></router-link>
      <router-link to="/layout"><span class="home-link">对话</span></router-link>
      <router-link to="/user"><span class="home-link">个人空间</span></router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'articleNav',
  data () {
    return {
      newNum: 12
    }
  },
  methods: {
    sidebarShow () {
      this.$emit('sidebarShowDisplay')
    }
  }
}
</script>

<style lang="less" scoped>
  .nav {
    position: absolute;
    width: 100%;
    height: 64px;
    z-index: 1;
    padding-left: 50px;
    .el-icon-s-unfold {
      font-size: 26px;
      color: #fff;
      line-height: 64px;
      cursor: pointer;
    }
    .art-title {
      color: #fff;
      margin-left: 20px;
      font-size: 20px;
      font-weight: 500;
      line-height: 64px;
    }
    .article-all-icon {
      position: relative;
      float: right;
      width: 400px;
      line-height: 64px;
      .el-icon-message-solid {
        font-size: 26px;
        color: #fff;
        line-height: 64px;
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
      .home-link {
        line-height: 64px;
        font-size: 16px;
        color: #fff;
        text-decoration: none;
        margin-left: 30px;
        letter-spacing: 2px;
      }
    }
  }
</style>
