<template>
  <div>
    <course-info v-bind="courseInfo"></course-info>
    <classmate-list :release-id="parseInt($route.params['releaseId'])"></classmate-list>
    <student-ware-list :course-id="parseInt($route.params['id'])"></student-ware-list>
    <student-assignment-list :release-id="parseInt($route.params['releaseId'])"></student-assignment-list>
  </div>
</template>

<script>
  import CourseInfo from "@/components/common/CourseInfo";
  import ClassmateList from "@/components/student/courseInfo/ClassmateList";
  import StudentWareList from "@/components/student/courseInfo/StudentWareList";
  import {loadCourseBasicInfo} from "@/api/course";
  import StudentAssignmentList from "@/components/student/courseInfo/StudentAssignmentList";

  export default {

    name: "StudentCourse",
    components: {
      StudentAssignmentList,
      CourseInfo, ClassmateList, StudentWareList
    },
    data() {
      return {
        courseInfo: null
      }
    },
    created() {
      this.init();
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
        this.getBasicInfo();
      }
    }
  }
</script>

<style scoped>

</style>
