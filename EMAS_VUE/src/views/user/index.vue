<template>
  <div class="user">
    <userNav></userNav>
    <userBody></userBody>
  </div>
</template>

<script>
import userNav from '@/components/user/nav.vue'
import userBody from '@/components/user/body.vue'
export default {
  name: 'userIndex',
  components: {
    userNav,
    userBody
  }
}
</script>

<style>
.user {
  width: 100%;
  height: 100%;
}
</style>
