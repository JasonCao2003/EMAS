<template>
  <div class="article">
    <articleNav @sidebarShowDisplay="sidebarShowDisplay"></articleNav>
    <articleSidebar :leftShow="leftShow" :sidebarIsShow="sidebarIsShow" @sidebarShowDisplay="sidebarShowDisplay"></articleSidebar>
    <articleBody></articleBody>
  </div>
</template>

<script>
import articleNav from '@/components/article/nav.vue'
import articleSidebar from '@/components/article/sidebar.vue'
import articleBody from '@/components/article/body.vue'
export default {
  name: 'articleIndex',
  components: {
    articleNav,
    articleSidebar,
    articleBody
  },
  data () {
    return {
      sidebarIsShow: 'none',
      leftShow: '-240px',
      topShow: '-240px'
    }
  },
  methods: {
    sidebarShowDisplay () {
      this.sidebarIsShow = this.sidebarIsShow === 'none' ? 'block' : 'none'
      this.leftShow = this.leftShow === '-240px' ? '0px' : '-240px'
    }
  }
}
</script>

<style lang="less" scoped>
  .article {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
