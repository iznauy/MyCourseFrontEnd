<template>
  <div @click="goHome">
    <span class="logo">教学支持系统</span>
  </div>
</template>

<script>
  export default {
    name: "Logo",
    methods: {
      goHome() {
        console.log("logo clicked!");
        if (this.$store.getters.getUserType === '')
          this.$router.push("/")
      }
    }
  }
</script>

<style scoped>
    .logo {
      margin: 5px;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      font-size: 20px;
      font-weight: 700;

    }
</style>
