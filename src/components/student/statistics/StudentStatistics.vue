<template>
  <div style="padding: 10px">
    <el-tabs tab-position="left">
      <el-tab-pane label="选课">
        <course-select-record style="margin: 20px auto; width: 571px"></course-select-record>
      </el-tab-pane>
      <el-tab-pane label="成绩">
        <course-score-records style="margin: 20px auto; width: 451px"></course-score-records>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import CourseSelectRecord from "@/components/student/statistics/CourseSelectRecords";
  import CourseScoreRecords from "@/components/student/statistics/CourseScoreRecords";
  export default {
    name: "StudentStatistics",
    components: {
      CourseSelectRecord, CourseScoreRecords
    }
  }
</script>

<style scoped>

</style>
