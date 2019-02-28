<template>
  <div>
    <poster-item-list v-bind="data" @change="changePage"></poster-item-list>
    <div class="createPoster" style="width: 600px; padding: 10px 30px 50px 30px; margin: 20px auto; background-color: aliceblue">
      <h2>发布新帖</h2>
      <el-form :model="newPost" title="发表新帖" label-position="left" label-width="40px">
        <el-form-item label="标题">
          <el-input clearable v-model="newPost.title" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="正文">
          <el-input type="textarea" :autosize="{ minRows: 10 }" clearable v-model="newPost.content"></el-input>
        </el-form-item>
      </el-form>
      <el-button style="float: right;" type="success" @click="createPoster" size="small">发布</el-button>
    </div>
  </div>
</template>

<script>

  import {loadPosters, sendPoster} from "@/api/forum/forum";
  import PosterItem from "@/components/forum/PosterItem"
  import PosterItemList from "@/components/forum/PosterItemList";

  export default {
    name: "ForumContent",
    data() {
      return {
        page: 0,
        pageSize: 3,
        newPost: {
          title: "",
          content: ""
        },
        data: null
      }
    },
    methods: {
      getPosters() {
        loadPosters(this.$store.getters.token, this.$route.params['id'], this.page, this.pageSize,
        res => {
          this.data = res.data;
        },
        error => {
          this.$message.error("获取信息失败：" + error.response.data.message);
        })
      },
      createPoster() {
        sendPoster(this.$store.getters.token, this.$route.params['id'], this.newPost.title, this.newPost.content,
        res => {
          this.$message.info("发表成功");
          this.$router.go(0);
        },
        error => {
          this.$message.error("发送失败：" + error.response.data.message())
        })
      },
      changePage(page) {
        this.page = page - 1;
        this.getPosters();
      }
    },
    created() {
      console.log("create forum content");
      this.getPosters();
    },
    components: {
      PosterItemList,
      PosterItem
    },
    watch: {
      '$router': 'getPosters'
    }
  }
</script>

<style scoped>

</style>
