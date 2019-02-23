<template>
  <div>
    <admin-navi></admin-navi>
    <router-view></router-view>
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
