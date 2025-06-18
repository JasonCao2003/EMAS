<template>
  <div class="main">
    <homeNav></homeNav>
    <homePic></homePic>
    <homeChar></homeChar>
    <homeIntr></homeIntr>
  </div>
</template>

<script>
import homeNav from '@/components/home/nav.vue'
import homePic from '@/components/home/pic.vue'
import homeChar from '@/components/home/char.vue'
import homeIntr from '@/components/home/intr.vue'
export default {
  name: 'homeIndex',
  components: {
    homeNav,
    homePic,
    homeChar,
    homeIntr
  }
}
</script>

<style lang="less" scoped>
.main {
  height: 1800px;
}
</style>
