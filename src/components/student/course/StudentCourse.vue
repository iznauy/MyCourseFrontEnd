<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="搜索">
        <el-input v-model="keyWord" placeholder="关键字" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="success" @click="keyWord = ''">清除</el-button>
      </el-form-item>
    </el-form>
    <div v-if="courses !== null">
      <student-course-item v-for="(data, index) in courses" v-bind="data" :key="courses.id" v-show="filter(data)"></student-course-item>
    </div>
  </div>
</template>

<script>
  import {loadOwnCourse} from "@/api/student/studentCourse";
  import StudentCourseItem from "@/components/student/course/StudentCourseItem";

  export default {
    name: "StudentCourse",
    components: {StudentCourseItem},
    data() {
      return {
        keyWord: null,
        courses: null
      }
    },
    methods: {
      filter(data) {
        return true;
      },
      getOwnCourses() {
        loadOwnCourse(this.$store.getters.token,
        res => {
          this.courses = res.data;
        },
        error => {
          this.$message.error("获取信息失败：" + error.response.data.message);
        })
      }
    },
    created() {
      this.getOwnCourses();
    },
    watch: {
      "$router": "getOwnCourses"
    }
  }
</script>

<style scoped>

</style>
