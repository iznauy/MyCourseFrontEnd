<template>
  <el-card>
    <div slot="header">
      <router-link :to="posterUrl">
        <span>{{title}}</span>
      </router-link>
    </div>
  </el-card>
</template>

<script>
  export default {
    props: {
      "creatorType" : String,
      "creatorEmail": String,
      "id": Number,
      "creatorUsername": String,
      "creatorAvatar": String,
      "title": String,
      "replyCount": Number,
      "changeTime": String
    },
    name: "PosterItem",
    data() {
      return {
      }
    },
    computed: {
      posterUrl() {
        return "/forum/" + this.$route.params.id + '/' + this.id;
      }
    }
  }
</script>

<style scoped>

</style>
