<template>
  <div v-if="!hasProcessed">
    <el-card>
      <div slot="header">
        <span>{{name}}</span>
      </div>
      <span>描述：{{description}}</span>
      <span>创建日期：{{createDate}}</span>
      <span>创建者：{{creatorEmail}}</span>
      <el-button type="primary" @click="disApprove">拒绝</el-button>
      <el-button type="success" @click="approve">批准</el-button>
    </el-card>
  </div>
</template>

<script>

  import {checkCourse} from "@/api/administrator/adminCourse";

  export default {
    props: {
      "name": String,
      "id": Number,
      "description": String,
      "createDate": String,
      "creatorEmail": String
    },
    name: "AdminCourseItem",
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
        checkCourse(this.$store.getters.token, this.id, true,
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
        checkCourse(this.$store.getters.token, this.id, false,
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
