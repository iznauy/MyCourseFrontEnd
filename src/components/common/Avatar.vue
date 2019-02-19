<template>
  <img class="avatar" :src="$store.getters['avatar']">
</template>

<script>
  export default {
    name: "Avatar",
  }
</script>

<style scoped>
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 3px;
    display: inline;
  }
</style>
