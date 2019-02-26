<template>
  <div>
    <admin-navi></admin-navi>
    <router-view style="width: 60%; margin: 30px auto;"></router-view>
  </div>
</template>

<script>

  import AdminNavi from './AdminNavi'

  export default {
    name: "AdminMain",
    components: {
      AdminNavi
    }
  }

</script>

<style scoped>

</style>
