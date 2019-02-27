<template>
  <div>
    <el-dialog :visible="true" :before-close="close" title="作业" width="40%">
      <el-form style="width: 90%; margin: 5px auto" label-position="left">
        <el-form-item label="名称" label-width="80px" v-if="form.name" label-position="left">
          <el-input v-model="form.name" type="text" :disabled="true" size="small"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="80px" label-position="left">
          <el-input type="textarea" v-model="form.description" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="DDL" label-width="80px" label-position="left">
          <el-input type="text" :disabled="true" placeholder="截止日期" v-model="form.deadLine" size="small"></el-input>
        </el-form-item>
        <el-form-item label="是否提交" label-width="80px" label-position="left">
          <el-input v-model="commitDescription" type="text" :disabled="true" size="small"></el-input>
        </el-form-item>
        <el-form-item label="提交时间" label-width="80px" label-position="left" v-if="committed">
          <el-input v-model="state['upLoadTime']" type="text" :disabled="true" size="small"></el-input>
        </el-form-item>
        <el-form-item label="分数" label-width="60px" label-position="left" v-if="state['scored']">
          <el-input v-model="state['score']" type="number" :disabled="true" size="small"></el-input>
        </el-form-item>
        <el-form-item label-width="0px">
          <el-button type="success" v-if="committed" size="small" @click="download">下载</el-button>
          <el-button type="primary" size="small" @click="commitPanelVisible = true">提交</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
        width="30%"
        title="内层 Dialog"
        :visible.sync="commitPanelVisible"
        append-to-body>
        <el-upload
          ref="upload"
          action="string"
          :http-request="upload"
          :limit="1"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
        </el-upload>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
  import {commitAssignment, loadAssignmentsDetail, loadOwnAssignmentState} from "@/api/course";
  import {getUrl} from "@/api/tools/tool";

  export default {
    name: "StudentAssignmentDetail",
    props: {
      "assignmentId": Number
    },
    data() {
      return {
        form: {
          name: "",
          description: "",
          deadLine: ""
        },
        state: {
          id: 0,
          path: "",
          scored: false,
          score: null,
          upLoadTime: null
        },
        commitPanelVisible: false
      }
    },
    computed: {
      committed() {
        return this.state['id'] !== 0;
      },
      commitDescription() {
        if (this.state['id'] === 0)
          return "尚未提交";
        else
          return "已提交";
      }
    },
    methods: {
      getAssignmentDetail() {
        loadAssignmentsDetail(this.$store.getters.token, this.assignmentId,
          res => {
            this.form = res.data;
          },
          err => {
            console.log(err.response)
          })
      },
      getAssignmentState() {
        loadOwnAssignmentState(this.$store.getters.token, this.assignmentId,
          res => {
            this.state = res.data;
          },
          err => {
            console.log(err.response)
          })
      },
      getInfo() {
        this.getAssignmentDetail();
        this.getAssignmentState();
      },
      close() {
        console.log("关闭作业详细信息;");
        this.$emit('close')
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      upload(item) {
        commitAssignment(this.$store.getters.token, this.assignmentId, item.file,
          res => {
            this.$message.success("上传成功！");
            this.$router.go(0);
          },
          err => {
            this.$message.error("上传失败！");
          })
      },
      download() {
        window.open(getUrl(this.state.path), "__blank")
      }
    },
    created() {
      this.getInfo();
    }
  }
</script>

<style scoped>

</style>
