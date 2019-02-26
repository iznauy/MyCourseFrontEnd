<template>
  <div v-if="!hasProcessed">
    <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 10px;margin-top: 10px; cursor: pointer;">
      <el-container>
        <el-main style="background-color: transparent;">
          <div style="font-weight: 800;font-size: 15px; margin-bottom: 10px" class="center">{{name}}</div>
          <div style="text-align: left; font-size: 10px; margin-bottom: 10px">时间：{{displayedBeginDate}} - {{displayedEndDate}}</div>
          <div style="text-align: left; font-size: 10px; margin-bottom: 10px">班次：{{classOrder}}</div>
          <div style="text-align: left; font-size: 10px; margin-bottom: 10px; color: green;" v-if="within">开课中</div>
          <div style="text-align: left; font-size: 10px; margin-bottom: 10px; color: red;" v-if="after">已结束</div>
          <div style="text-align: left; font-size: 10px; margin-bottom: 10px; color: blue;" v-if="before">未开课</div>
        </el-main>
        <el-aside style="float: right;">
          <div style="margin: 90px 25px 10px 0">
            <el-button type="primary" style="float: right" size="small" @click="selectCourseRelease">选择</el-button>
          </div>
          <div style="clear: both;"></div>
        </el-aside>
      </el-container>
    </el-card>
  </div>
</template>

<script>
  import {convertStringToDate} from "@/api/tools/tool";
  import {selectCourse} from "@/api/student/studentCourse";

  export default {
    name: "AvailableCourseItem",
    props: {
      "id": Number,
      "courseId": Number,
      "begin": String,
      "end": String,
      "classOrder": Number,
      "name": String
    },
    data() {
      return {
        hasProcessed: false
      }
    },
    computed: {
      displayedBeginDate() {
        return this.begin.split(" ")[0];
      },
      displayedEndDate() {
        return this.end.split(" ")[0];
      },
      within() {
        let begin = convertStringToDate(this.begin);
        let end = convertStringToDate(this.end);
        let now = new Date();
        return now >= begin && now <= end;
      },
      before() {
        let begin = convertStringToDate(this.begin);
        let now = new Date();
        return now < begin;
      },
      after() {
        let end = convertStringToDate(this.end);
        let now = new Date();
        return now > end;
      }
    },
    methods: {
      selectCourseRelease() {
        selectCourse(this.$store.getters.token, this.id,
          res => {
            this.$message.success("选课成功！");
            this.hasProcessed = true;
            }, err => {
            this.$message.error("选课失败！");
        });
      }
    }
  }
</script>

<style scoped>
  .center {
    display:flex;
    /*justify-content:center;*/
    align-items:center;
  }
</style>
