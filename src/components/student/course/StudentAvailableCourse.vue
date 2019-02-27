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
      <available-course-item v-for="(data, index) in courses" v-bind="data" :key="courses.id" v-show="filter(data)"></available-course-item>
    </div>
  </div>
</template>

<script>
  import {availableCourses} from "@/api/student/studentCourse";
  import AvailableCourseItem from "@/components/student/course/AvailableCourseItem";

  export default {
    name: "StudentAvailableCourse",
    components: {AvailableCourseItem},
    data() {
      return {
        keyWord: "",
        courses: null
      }
    },
    methods: {
      filter(data) {
        return data.name.indexOf(this.keyWord) !== -1;
      },
      getAvailableCourses() {
        availableCourses(this.$store.getters.token,
          res => {
            this.courses = res.data;
          },
          error => {
            this.$message.error("获取信息失败：" + error.response.data.message);
          })
      }
    },
    created() {
      this.getAvailableCourses();
    },
    watch: {
      "$router": "getAvailableCourses"
    }
  }
</script>

<style scoped>

</style>
