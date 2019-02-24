<template>
  <el-card>
    <div slot="header">
      <router-link :to="contentUrl">
        <span>{{name}}</span>
      </router-link>
    </div>
  </el-card>
</template>

<script>
  export default {
    props: {
      "name": String,
      "courseId": Number
    },
    name: "ForumItem",
    data() {
      return {
      }
    },
    computed: {
      contentUrl() {
        return "/forum/" + this.courseId;
      }
    }
  }
</script>

<style scoped>

</style>
