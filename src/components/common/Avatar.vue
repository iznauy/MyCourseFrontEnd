<template>
  <div>
    <img class="avatar" :src="path" />
  </div>
</template>

<script>
  export default {
    name: "Avatar",
    props: ['path']
  }
</script>

<style scoped>
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 3px;
  }
</style>
