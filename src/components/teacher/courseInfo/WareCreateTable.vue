<template>
  <div>
    <el-dialog :visible="true" :before-close="close" title="上传课件" width="40%">
      <el-form style="width: 90%; margin: 5px auto" label-position="left">
        <el-form-item label="名称" label-width="40px">
          <el-input v-model="name" size="small"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-upload
            action="string"
            :auto-upload="false"
            :show-file-list="true"
            :on-success="handleSuccess"
            :http-request="upload"
            :limit="1"
            ref="upload">
            <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="commitForm">上传到服务器</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

  import {releaseWare} from "@/api/course";

  export default {
    props: {
      courseId: Number
    },
    name: "AssignmentCreateTable",
    data() {
      return {
        name: ""
      }
    },
    methods: {
      commitForm() {
        this.$refs.upload.submit();
      },
      close() {
        this.$emit('close')
      },
      upload(item) {
        releaseWare(this.$store.getters.token, this.courseId, this.name, item.file,
        res => {
          this.$message.success("上传成功！");
          this.$router.go(0);
        },
        err => {
         this.$message.error("上传失败！");
        })
      }
    }
  }

</script>

<style scoped>

</style>
