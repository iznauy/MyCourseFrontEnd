<template>
  <div>
    <course-info v-bind="courseInfo">
      <div v-if="!courseScore.scored">
        <el-button type="danger" size="small" style="margin-top: 10px; margin-bottom: 10px" @click="quitVisible = true">退选</el-button>
      </div>
      <div v-if="courseScore.scored">
        <span style="font-size: 13px; margin-bottom: 10px">您的成绩：{{courseScore.score}}</span>
        <el-button v-if="courseScore.publicized" style="margin-left: 10px; margin-top: 10px; margin-bottom: 10px" size="small" type="primary" @click="downloadScore">下载班级成绩</el-button>
      </div>
    </course-info>
    <div style="margin-top: 30px">
      <el-tabs tabPosition="left">
        <el-tab-pane label="作业">
          <student-assignment-list :release-id="parseInt($route.params['releaseId'])"></student-assignment-list>
        </el-tab-pane>
        <el-tab-pane label="课件">
          <student-ware-list :course-id="parseInt($route.params['id'])"></student-ware-list>
        </el-tab-pane>
        <el-tab-pane label="公告板">
          <student-broad-casting :release-id="parseInt($route.params['releaseId'])"></student-broad-casting>
        </el-tab-pane>
        <el-tab-pane label="同学">
          <classmate-list :release-id="parseInt($route.params['releaseId'])"></classmate-list>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--<el-container>-->
      <!--<el-aside>-->
        <!--<student-assignment-list :release-id="parseInt($route.params['releaseId'])"></student-assignment-list>-->
        <!--<student-ware-list :course-id="parseInt($route.params['id'])"></student-ware-list>-->
      <!--</el-aside>-->
      <!--<el-main>-->
        <!--<student-broad-casting :release-id="parseInt($route.params['releaseId'])" style="float: right; width: 400px;top: -21px;position: relative;"></student-broad-casting>-->
        <!--<classmate-list :release-id="parseInt($route.params['releaseId'])" style="float: right; width: 201px;top: -21px;position: relative;"></classmate-list>-->
      <!--</el-main>-->
    <!--</el-container>-->


    <div>
      <forum-content></forum-content>
    </div>

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
  import {loadCourseScore, quitCourse} from "@/api/student/studentCourse";
  import StudentBroadCasting from "@/components/student/courseInfo/StudentBroadCasting";
  import ForumContent from "@/components/forum/ForumContent";
  import {getUrl} from "@/api/tools/tool";

  export default {

    name: "StudentCourse",
    components: {
      ForumContent,
      StudentBroadCasting,
      StudentAssignmentList,
      CourseInfo, ClassmateList, StudentWareList
    },
    data() {
      return {
        courseInfo: null,
        quitVisible: false,
        courseScore: {
          scored: false,
          score: null,
          publicized: false,
          path: null
        }
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
      getScoreInfo() {
        loadCourseScore(this.$store.getters.token, this.$route.params['releaseId'],
        res => {
          this.courseScore = res.data;
        },
          error => {
          console.log(error.response)
        })
      },
      init() {
        this.getScoreInfo();
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
      },
      downloadScore() {
        window.open(getUrl(this.courseScore.path), "__blank")
      }
    }
  }
</script>

<style scoped>

</style>
