<template>
  <div>
    <course-info v-bind="courseInfo" v-cloak></course-info>
    <teacher-assignment-list style="display: inline;" :release-id="3" v-cloak></teacher-assignment-list>
    <teacher-course-ware-list style="display: inline;" :course-id="parseInt($route.params['id'])" v-cloak></teacher-course-ware-list>
    <student-list style="display: inline;" :release-id="3" v-cloak></student-list>
    <teacher-broad-casting :release-id="3" v-cloak></teacher-broad-casting>
  </div>
</template>

<script>
  import {loadCourseBasicInfo} from "@/api/course";
  import CourseInfo from "@/components/common/CourseInfo";
  import TeacherAssignmentList from "@/components/teacher/courseInfo/TeacherAssignmentList";
  import TeacherCourseWareList from "@/components/teacher/courseInfo/TeacherCourseWareList";
  import StudentList from "@/components/teacher/courseInfo/StudentList";
  import TeacherBroadCasting from "@/components/teacher/courseInfo/TeacherBroadCasting"

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
      StudentList,
      TeacherCourseWareList,
      CourseInfo, TeacherAssignmentList, TeacherBroadCasting
    }
  }
</script>

<style scoped>

</style>
