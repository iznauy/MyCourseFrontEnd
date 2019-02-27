<template>
  <div>
    <course-info v-bind="courseInfo">
      <el-button type="danger" size="small" style="margin-top: 10px; margin-bottom: 10px" @click="quitVisible = true">退选</el-button>
    </course-info>
    <classmate-list :release-id="parseInt($route.params['releaseId'])"></classmate-list>
    <student-ware-list :course-id="parseInt($route.params['id'])"></student-ware-list>
    <student-assignment-list :release-id="parseInt($route.params['releaseId'])"></student-assignment-list>

    <el-dialog title="警告" :visible.sync="quitVisible" width="20%">
      <span>确定要退选？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="quitVisible = false">取消</el-button>
        <el-button type="danger" @click="quit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import CourseInfo from "@/components/common/CourseInfo";
  import ClassmateList from "@/components/student/courseInfo/ClassmateList";
  import StudentWareList from "@/components/student/courseInfo/StudentWareList";
  import {loadCourseBasicInfo} from "@/api/course";
  import StudentAssignmentList from "@/components/student/courseInfo/StudentAssignmentList";
  import {quitCourse} from "@/api/student/studentCourse";

  export default {

    name: "StudentCourse",
    components: {
      StudentAssignmentList,
      CourseInfo, ClassmateList, StudentWareList
    },
    data() {
      return {
        courseInfo: null,
        quitVisible: false
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
      },
      quit() {
        quitCourse(this.$store.getters.token, this.$route.params['releaseId'],
        res => {
          this.$message.success("退选成功");
          this.$router.push("/student/myCourse")
        },
        err => {
          this.$message.error("退选失败！");
        })
      }
    }
  }
</script>

<style scoped>

</style>
