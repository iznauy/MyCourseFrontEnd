<template>
  <div>
    <course-info v-bind="courseInfo" v-cloak></course-info>
    <div style="margin-top: 30px">
      <el-tabs tabPosition="left">
        <el-tab-pane label="课件">
          <teacher-course-ware-list :course-id="parseInt($route.params['id'])" v-cloak></teacher-course-ware-list>
        </el-tab-pane>
        <el-tab-pane label="历史发布">
          <release-panel :course-id="parseInt($route.params['id'])" v-cloak style="margin-bottom: 6px"></release-panel>
        </el-tab-pane>
      </el-tabs>
    </div>
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
  import HistoryReleasePanel from "@/components/teacher/course/HistoryReleasePanel";
  import ReleasePanel from "@/components/teacher/course/ReleasePanel";
  import ForumContent from "@/components/forum/ForumContent";

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
      ForumContent,
      ReleasePanel,
      HistoryReleasePanel,
      StudentList,
      TeacherCourseWareList,
      CourseInfo, TeacherAssignmentList, TeacherBroadCasting
    }
  }
</script>

<style scoped>

</style>
