<template>
  <div>
    <course-info v-bind="courseInfo" v-cloak></course-info>
    <teacher-assignment-list :release-id="1" v-cloak></teacher-assignment-list>
  </div>
</template>

<script>
  import {loadCourseBasicInfo} from "@/api/course";
  import CourseInfo from "@/components/common/CourseInfo";
  import TeacherAssignmentList from "@/components/teacher/courseInfo/TeacherAssignmentList";

  export default {
    name: "TeacherCourse",
    data() {
      return {
        courseInfo: null
      }
    },
    created() {
      this.init();
    },
    watch: {

    },
    methods: {
      getBasicInfo() {
        loadCourseBasicInfo(this.$store.getters.token, this.$route.params['id'],
        res => {
          this.courseInfo = res.data;
        },
        error => {
          console.log(error.response)
        })
      },
      init() {
        this.getBasicInfo()
      }
    },
    components: {
      CourseInfo, TeacherAssignmentList

    }
  }
</script>

<style scoped>

</style>
