<template>
  <div>
    <course-info v-bind="courseInfo" v-cloak></course-info>
    <teacher-broad-casting :release-id="parseInt($route.params['releaseId'])" v-cloak ></teacher-broad-casting>
    <student-list :release-id="parseInt($route.params['releaseId'])" v-cloak></student-list>
    <teacher-assignment-list :release-id="parseInt($route.params['releaseId'])" v-cloak></teacher-assignment-list>
    <forum-content></forum-content>
    </div>
</template>

<script>
  import {loadCourseBasicInfo} from "@/api/course";
  import CourseInfo from "@/components/common/CourseInfo";
  import TeacherAssignmentList from "@/components/teacher/courseInfo/TeacherAssignmentList";
  import TeacherCourseWareList from "@/components/teacher/courseInfo/TeacherCourseWareList";
  import StudentList from "@/components/teacher/courseInfo/StudentList";
  import TeacherBroadCasting from "@/components/teacher/courseInfo/TeacherBroadCasting"
  import ForumContent from "@/components/forum/ForumContent";

  export default {
    name: "TeacherRelease",
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
      ForumContent,
      StudentList,
      TeacherCourseWareList,
      CourseInfo, TeacherAssignmentList, TeacherBroadCasting
    }
  }
</script>

<style scoped>

</style>
