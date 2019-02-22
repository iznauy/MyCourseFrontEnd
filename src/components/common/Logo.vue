<template>
  <div @click="goHome" style="margin: 0 auto;">
    <span class="logo">教学支持系统</span>
  </div>
</template>

<script>
  export default {
    name: "Logo",
    methods: {
      goHome() {
        console.log("logo clicked!");
        if (this.$store.getters.userType === '')
          this.$router.push("/")
      }
    }
  }
</script>

<style scoped>
    .logo {
      margin: 0 auto;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      font-size: 25px;
      font-weight: 900;

    }
</style>
