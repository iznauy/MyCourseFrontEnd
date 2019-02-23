<template>
  <div v-if="!hasProcessed">
    <el-card>
      <div slot="header">
        <span>{{courseName}}</span>
      </div>
      <span>创建日期：{{createDate}}</span>
      <span>创建者：{{creatorEmail}}</span>
      <span>开始日期：{{beginDate}}</span>
      <span>结束日期：{{endDate}}</span>
      <span>班次：{{classOrder}}</span>
      <span>是否限额：{{hasQuota}}</span>
      <span v-if="hasQuota">限额：{{quota}}</span>
      <el-button type="primary" @click="disApprove">拒绝</el-button>
      <el-button type="success" @click="approve">批准</el-button>
    </el-card>
  </div>
</template>

<script>

  import {checkCourseRelease} from "@/api/administrator/adminCourse";

  export default {
    props: {
      "courseName": String,
      "id": Number,
      "createDate": String,
      "beginDate": String,
      "endDate": String,
      "classOrder": Number,
      "creatorEmail": String,
      "hasQuota": Boolean,
      "quota": Number
    },
    name: "AdminReleaseItem",
    data() {
      return {
        hasProcessed: false
      }
    },
    methods: {
      vanish() {
        this.hasProcessed = true;
      },
      approve() {
        checkCourseRelease(this.$store.getters.token, this.id, true,
          res => {
            this.$message({
              message: "审批成功!",
              type: 'success'
            });
            this.vanish()
          },
          err => {
            this.$message.error("审批失败：" + err.response.data.message);
          });
      },
      disApprove() {
        checkCourseRelease(this.$store.getters.token, this.id, false,
          res => {
            this.$message({
              message: "审批成功!",
              type: 'success'
            });
            this.vanish()
          },
          err => {
            this.$message.error("审批失败：" + err.response.data.message);
          });
      }
    }
  }

</script>

<style scoped>

</style>
