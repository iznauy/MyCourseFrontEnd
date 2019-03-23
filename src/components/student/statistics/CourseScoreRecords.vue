<template>
  <div>
    <el-table
      :data="records"
      style="width: 451px"
      max-height="500">
      <el-table-column
        prop="scoreTime"
        label="日期"
        sortable
        width="200"
        column-key="scoreTime"
        :filters="scoreTimeFilters"
        :filter-method="scoreTimeFilterMethod">
      </el-table-column>
      <el-table-column
        prop="courseName"
        label="课程名"
        sortable
        width="150"
        column-key="courseName"
        :filters="courseNameFilters"
        :filter-method="courseNameFilterMethod">
      </el-table-column>
      <el-table-column
        prop="score"
        label="分数"
        width="100"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  import {loadCourseScores} from "@/api/student/studentInfo";

  export default {
    name: "CourseSelectRecord",
    data() {
      return {
        records: null,
        scoreTimeFilters: null,
        courseNameFilters: null
      }
    },
    methods: {
      getRecords() {
        loadCourseScores(this.$store.getters.token, res => {
          this.records = res.data;
          this.generateScoreTimeFilter();
          this.generateCourseNameFilters();
        })
      },
      generateScoreTimeFilter() {
        this.scoreTimeFilters = [];
        let years = new Set();
        for (let i = 0; i < this.records.length; i++) {
          let year = this.records[i]['scoreTime'].split("-")[0];
          years.add(year);
        }
        years.forEach(e => {
          this.scoreTimeFilters.push({ text: e, value: e });
        })
      },
      generateCourseNameFilters() {
        this.courseNameFilters = [];
        let names = new Set();
        for (let i = 0; i < this.records.length; i++) {
          names.add(this.records[i]['courseName']);
        }
        names.forEach(element => {
          this.courseNameFilters.push({ text: element, value: element })
        })
      },
      scoreTimeFilterMethod(value, row) {
        return row['scoreTime'].split("-")[0] === value;
      },
      courseNameFilterMethod(value, row) {
        return row['courseName'] === value;
      },
    },
    created() {
      this.getRecords();
    }
  }

</script>

<style scoped>

</style>
