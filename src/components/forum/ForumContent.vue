<template>
  <div>
    <div v-if="posts !== null" class="poster">
      <poster-item v-for="(data, index) in posts" :key="index" v-bind="data"></poster-item>
    </div>
    <div class="createPoster">
      <el-form :model="newPost" title="发表新帖" label-position="left" label-width="100px">
        <el-form-item label="标题">
          <el-input clearable v-model="newPost.title"></el-input>
        </el-form-item>
        <el-form-item label="正文">
          <el-input type="textarea" clearable v-model="newPost.content"></el-input>
        </el-form-item>
      </el-form>
      <el-button style="width: 20%; float: right;" type="success" @click="createPoster">发布</el-button>
    </div>
  </div>

</template>

<script>

  import {loadPosters, sendPoster} from "@/api/forum/forum";
  import PosterItem from "@/components/forum/PosterItem"

  export default {
    name: "ForumContent",
    data() {
      return {
        posts: null,
        page: 0,
        pageSize: 30,
        totalPage: 0,
        newPost: {
          title: "",
          content: ""
        }
      }
    },
    methods: {
      getPosters() {
        loadPosters(this.$store.getters.token, this.$route.params.id, this.page, this.pageSize,
        res => {
          this.posts = res.data.posts;
          this.totalPage = res.data.totalPage;
        },
        error => {
          this.$message.error("获取信息失败：" + error.response.data.message);
        })
      },
      createPoster() {
        sendPoster(this.$store.getters.token, this.$route.params.id, this.newPost.title, this.newPost.content,
        res => {
          this.$message.info("发表成功");
          this.$router.go(0);
        },
        error => {
          this.$message.error("发送失败：" + error.response.data.message())
        })
      }
    },
    created() {
      this.getPosters();
    },
    components: {
      PosterItem
    },
    watch: {
      '$router': 'getPosters'
    }
  }
</script>

<style scoped>

</style>
