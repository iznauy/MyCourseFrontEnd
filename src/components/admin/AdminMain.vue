<template>
  <div>
    <admin-navi></admin-navi>
    <div>
      <router-view style="width: 60%; margin: 30px auto; padding: 20px; box-shadow: 0px 0px 1px 2px rgba(0,0,0,.1);"></router-view>
    </div>
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
