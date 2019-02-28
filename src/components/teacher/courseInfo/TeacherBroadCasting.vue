<template>
  <div style="width: 60%;">
    <h2 style="text-align: left;">公告板</h2>
    <el-card :body-style="{ padding: '5px', overflow: 'hidden'}">
      <div slot="header" style="height: 15px">
        <span style="float: left; font-weight: 800">最新公告</span>
        <el-button style="float: right; padding: 1px 0" type="text" @click="displayEdit = true">新公告</el-button>
      </div>
      <el-container>
        <el-main>
          <div v-if="hasBroadCasting" style="font-size: 10px; text-align: left; margin-top: -5px">
            <span>发布于：{{broadCasting.lastModified}}</span>
          </div>
          <div style="text-align: left; margin-top: 10px" class="content">
            <span v-if="hasBroadCasting">{{broadCasting.content}}</span>
          </div>
          <div style="text-align: center; margin-bottom: 15px">
            <span v-if="!hasBroadCasting">暂无内容</span>
          </div>
        </el-main>
      </el-container>
    </el-card>
    <el-dialog :visible.sync="displayEdit" title="编辑公告" width="40%">
      <el-form style="width: 90%; margin: 5px auto;" label-position="left">
        <el-form-item label="公告" label-width="40px">
          <el-input type="textarea" v-model="newContent"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="displayEdit = false" size="small">取消</el-button>
          <el-button type="primary" @click="createBroadCasting" size="small">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {loadBroadCasting, releaseBroadCasting} from "@/api/course";

  export default {
    props: {
      releaseId: Number
    },
    name: "TeacherBroadCasting",
    data() {
      return {
        broadCasting: {
          id: 0,
          content: "",
          lastModified: ""
        },
        newContent: "",
        displayEdit: false
      }
    },
    methods: {
      getBroadCasting() {
        loadBroadCasting(this.$store.getters.token, this.releaseId,
        res => {
          this.broadCasting = res.data;
        },
        err => {
          console.log(err.response)
        })
      },
      createBroadCasting() {
        releaseBroadCasting(this.$store.getters.token, this.releaseId, this.newContent,
        res => {
          this.displayEdit = false;
          this.newContent = "";
          this.getBroadCasting();
        },
        err => {
          this.$message.error("创建失败！");
        })

      }
    },
    created() {
      this.getBroadCasting();
    },
    computed: {
      hasBroadCasting() {
        return this.broadCasting.id !== 0;
      }
    }
  }
</script>

<style>
  .content {
    width: 100%;
    height: auto;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }
</style>
