<template>
  <div id="main">
    <layoutNav  :listArr="listArr" @update-listArr="updateListArr"></layoutNav>
    <layoutChat :listArr="listArr"></layoutChat>
    <!-- <layoutMsg></layoutMsg> -->
  </div>
</template>

<script>
import layoutNav from '../../components/layout/nav.vue'
import layoutChat from '../../components/layout/chat.vue'
// import layoutMsg from '../../components/layout/msg.vue'
export default {
  name: 'layoutIndex',
  components: {
    layoutNav,
    layoutChat
    // layoutMsg
  },
  data () {
    return {
      listArr: []
    }
  },
  methods: {
    updateListArr (listArr) {
      this.listArr = listArr
    }
  }
}
</script>

<style lang="less" scoped>
// #main {
//   background-color: #e6efff;
//   background: url("../../assets/layout/index.png"); //这里的地址是用你项目中图片所在的路径为准
//   background-repeat: no-repeat; //将图片样式不重复
//   background-size: 100% 100%; //设置图片大小

//   .blur {
//     width: 100%;
//     height: 100%;
//     /* 磨砂 */
//     backdrop-filter: blur(1px);
//     background: rgba(50, 50, 50, 0.2);
//     /* background: rgba(155, 155, 155, 0.2); */
//     /* display: block; */
//     position: absolute;
//     flex-direction: column;
//   }
// }
</style>
