<template>
  <div>
    <el-button type="text" class="button" @click="changeCreateCourseVisible">创建课程</el-button>
    <div v-if="courses !== null">
      <teacher-course-item v-for="(data, index) in courses" :key="index" v-bind="data"></teacher-course-item>
    </div>
   <course-create-table v-if="showCreateCourseTable" @close="changeCreateCourseVisible"></course-create-table>
  </div>

</template>

<script>

  import {ownCreatedCourses, createCourse} from "@/api/teacher/teacherCourse";
  import TeacherCourseItem from './CourseItem'
  import CourseCreateTable from './CourseCreateTable'

  export default {
    name: "TeacherCourse",
    data() {
      return {
        courses: null,
        showCreateCourseTable: false
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

</style>
