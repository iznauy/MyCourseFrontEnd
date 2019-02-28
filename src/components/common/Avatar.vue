<template>
  <img class="avatar" :src="avatar">
</template>

<script>
  import {getUrl} from "@/api/tools/tool";

  export default {
    name: "Avatar",
    computed: {
      avatar() {
        return getUrl(this.$store.getters['avatar']);
      }
    }
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
