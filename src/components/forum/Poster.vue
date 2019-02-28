<template>
  <div>
    <poster-main v-bind="posterInfo"></poster-main>
    <reply-list v-bind="replies" @change="changePage"></reply-list>
    <div class="createPoster" style="width: 600px; padding: 10px 30px 50px 30px; margin: 20px auto; background-color: aliceblue">
      <h2>回复</h2>
      <el-form :model="newReply" title="回复" label-position="left" label-width="40px">
        <el-form-item label="内容">
          <el-input type="textarea" :autosize="{ minRows: 10 }" clearable v-model="newReply.content"></el-input>
        </el-form-item>
      </el-form>
      <el-button style="float: right;" type="success" @click="createReply" size="small">发布</el-button>
    </div>
  </div>
</template>

<script>
  import PosterMain from "@/components/forum/PosterMain";
  import ReplyList from "@/components/forum/ReplyList";
  import {loadPosterInfo, loadReplies, sendReply} from "@/api/forum/forum";

  export default {
    name: "Poster",
    components: {
      ReplyList,
      PosterMain
    },
    data() {
      return {
        newReply: {
          content: ""
        },
        page: 0,
        pageSize: 3,
        replies: null,
        posterInfo: null
      }
    },
    created() {
      this.init();
    },
    methods: {
      createReply() {
        sendReply(this.$store.getters.token, this.$route.params['posterId'], this.newReply.content,
        res => {
          this.$message.success("发布成功！");
          this.$router.go(0);
        },
        err => {
          this.$message.error("发布失败！");
        })
      },
      getPosterInfo() {
        loadPosterInfo(this.$store.getters.token, this.$route.params['posterId'],
        res => {
          this.posterInfo = res.data;
        })
      },
      getReplies() {
        loadReplies(this.$store.getters.token, this.$route.params['posterId'], this.page, this.pageSize,
        res => {
          this.replies = res.data;
        })
      },
      init() {
        this.getPosterInfo();
        this.getReplies();
      },
      changePage(page) {
        this.page = page - 1;
        this.getReplies();
      },
      watch: {
        '$router': 'init'
      }
    }
  }
</script>

<style scoped>

</style>
