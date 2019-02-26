<template>
  <div v-if="!hasProcessed">
    <div @click="showDetail">
      <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 10px;margin-top: 10px; cursor: pointer;">
        <el-container>
          <el-main style="background-color: transparent;">
            <div style="font-weight: 800;font-size: 15px; margin-bottom: 10px" class="center">{{courseName}}</div>
            <div style="text-align: left; font-size: 10px; margin-bottom: 10px">创建日期：{{createDate}}</div>
            <div style="text-align: left; font-size: 10px; margin-bottom: 10px">创建者：<span style="color: red;">{{creatorEmail}}</span></div>
          </el-main>
          <el-aside style="background-color: transparent; margin-top: 42px; margin-right: 15px;">
            <div style="text-align: right; font-size: 10px; margin-bottom: 10px">时间：{{displayedBeginDate}} - {{displayedEndDate}}</div>
            <div style="text-align: right; font-size: 10px; margin-bottom: 10px">班次：{{classOrder}}</div>
            <div style="text-align: right; font-size: 10px; margin-bottom: 10px" v-if="hasQuota">限额：{{quota}}</div>
          </el-aside>
        </el-container>
      </el-card>
    </div>

    <el-dialog :visible.sync="displayDetail" title="详细信息" width="40%">
      <el-form style="width: 80%; margin: 0 auto;" label-position="left">
        <el-form-item label-width="80px" label="名称">
          <el-input type="text" :disabled="true" v-model="courseName" size="small"></el-input>
        </el-form-item>
        <el-form-item label-width="80px" label="创建人">
          <el-input type="text" :disabled="true" v-model="creatorEmail" size="small"></el-input>
        </el-form-item>
        <el-form-item label-width="80px" label="创建时间">
          <el-input type="text" :disabled="true" v-model="createDate" size="small"></el-input>
        </el-form-item>
        <el-form-item label-width="80px" label="时间">
          <el-col :span="10">
            <el-input type="text" :disabled="true" v-model="displayedBeginDate" size="small"></el-input>
          </el-col>
          <el-col class="line" :span="4">-</el-col>
          <el-col :span="10">
            <el-input type="text" :disabled="true" v-model="displayedEndDate" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label-width="80px" label="限额" v-show="hasQuota">
          <el-input type="text" :disabled="true" v-model="quota" size="small"></el-input>
        </el-form-item>
        <el-form-item label-width="0" style="margin-top: 15px">
          <el-button type="primary" @click="disApprove" size="small">拒绝</el-button>
          <el-button type="success" @click="approve" size="small">批准</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
        hasProcessed: false,
        displayDetail: false
      }
    },
    methods: {
      vanishDetail() {
        this.displayDetail = false;
      },
      showDetail() {
        this.displayDetail = true;
      },
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
    },
    computed: {
      displayedBeginDate() {
        return this.beginDate.split(" ")[0]
      },
      displayedEndDate() {
        return this.endDate.split(" ")[0]
      }
    }
  }

</script>

<style scoped>

</style>
