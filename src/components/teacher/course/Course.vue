<template>
  <div style="width: 100%; margin-top: 100px">
    <el-form :inline="true" :model="filterCond">
      <el-form-item label="审批状况">
        <el-select v-model="filterCond.check" placeholder="全部"  size="small">
          <el-option label="已审批" value="hasChecked"></el-option>
          <el-option label="未审批" value="unChecked"></el-option>
          <el-option label="不限" value="all"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审批结果">
        <el-select v-model="filterCond.result" placeholder="全部"  size="small"
                    :disabled="filterCond.check !== 'hasChecked'">
          <el-option label="通过" value="passed"></el-option>
          <el-option label="未通过" value="rejected"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="updateCond">查找</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" class="button" size="small" @click="changeCreateCourseVisible">创建课程</el-button>
      </el-form-item>
    </el-form>
    <div v-if="courses !== null">
      <teacher-course-item v-for="(data, index) in courses" :key="index" v-bind="data" v-if="filter(data)"></teacher-course-item>
    </div>
    <course-create-table v-if="showCreateCourseTable" @close="changeCreateCourseVisible"></course-create-table>

  </div>

</template>

<script>

  import {ownCreatedCourses, createCourse} from "@/api/teacher/teacherCourse";
  import TeacherCourseItem from './CourseItem'
  import CourseCreateTable from './CourseCreateTable'
  import {deepClone} from "@/api/tools/tool";

  export default {
    name: "TeacherCourse",
    data() {
      return {
        courses: null,
        showCreateCourseTable: false,
        filterCond: {
          check: null,
          result: null
        },
        currCond: {
          check: null,
          result: null
        }
      }
    },
    components: {
      TeacherCourseItem, CourseCreateTable
    },
    methods: {
      getCourses() {
        ownCreatedCourses(this.$store.getters.token,
        res => {
          this.courses = res.data;
        },
        err => {
          console.log(err.response)
        })
      },
      changeCreateCourseVisible() {
        this.showCreateCourseTable = !this.showCreateCourseTable;
      },
      filter(data) {
        if (this.currCond.check === 'all' || this.currCond.check === null)
          return true;
        if (this.currCond.check === 'unChecked') {
          return !data.check;
        }
        if (this.currCond.check === 'hasChecked') {
          if (this.currCond.result === null || this.currCond.result === 'all')
            return data.check;
          if (this.currCond.result === 'passed')
            return data.check && data.approve;
          if (this.currCond.result === 'rejected')
            return data.check && !data.approve;
        }
        return false;
      },
      updateCond() {
        this.currCond = deepClone(this.filterCond);
      }
    },
    created() {
      this.getCourses();
    },
    watch: {
      '$router': 'getCourses'
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
