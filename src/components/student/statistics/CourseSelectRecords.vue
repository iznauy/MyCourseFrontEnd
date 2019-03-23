<template>
  <div>
    <el-table
      :data="records"
      style="width: 100%"
      ref="selectionTable">
      <el-table-column
        prop="operateTime"
        label="日期"
        sortable
        width="180"
        column-key="operateTime"
        :filters="operateTimeFilters"
        :filter-method="operateTimeFilterMethod">
      </el-table-column>
      <el-table-column
        prop="courseName"
        label="课程名"
        sortable
        width="180"
        column-key="courseName"
        :filters="courseNameFilters"
        :filter-method="courseNameFilterMethod">
      </el-table-column>
      <el-table-column
        prop="teacherName"
        label="教师名"
        sortable
        width="180"
        column-key="teacherName"
        :filters="teacherNameFilters"
        :filter-method="teacherNameFilterMethod">
      </el-table-column>
      <el-table-column
        prop="select"
        label="操作"
        width="100"
        :filters="[{ text: '选课', value: true}, { text: '退课', value: false}]"
        :filter-method="selectStateFilterMethod"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.select === true ? 'success' : 'danger'" disable-transitions>
            {{scope.row.select === true ? '选' : '退'}}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {loadCourseSelectRecord} from "@/api/student/studentInfo";

  export default {
    name: "CourseSelectRecord",
    data() {
      return {
        records: null,
        operateTimeFilters: null,
        courseNameFilters: null,
        teacherNameFilters: null
      }
    },
    methods: {
      getRecords() {
        loadCourseSelectRecord(this.$store.getters.token, res => {
          this.records = res.data;
          console.log(this.records[0]['select']);
          this.generateTeacherNameFilters();
          this.generateCourseNameFilters();
          this.generateOperateTimeFilters();
        })
      },
      generateOperateTimeFilters() {
        this.operateTimeFilters = [];
        let years = new Set();
        for (let i = 0; i < this.records.length; i++) {
          let year = this.records[i]['operateTime'].split("-")[0];
          years.add(year);
        }
        years.forEach(element => {
          this.operateTimeFilters.push({ text: element, value: element })
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
      generateTeacherNameFilters() {
        this.teacherNameFilters = [];
        let teachers = new Set();
        for (let i = 0; i < this.records.length; i++) {
          teachers.add(this.records[i]['teacherName']);
        }
        teachers.forEach(element => {
          this.teacherNameFilters.push({ text: element, value: element })
        })
      },
      operateTimeFilterMethod(value, row) {
        return row['operateTime'].split("-")[0] === value;
      },
      courseNameFilterMethod(value, row) {
        return row['courseName'] === value;
      },
      teacherNameFilterMethod(value, row) {
        return row['teacherName'] === value;
      },
      selectStateFilterMethod(value, row) {
        return true;
      }
    },
    created() {
      this.getRecords();
    }
  }

</script>

<style scoped>

</style>
