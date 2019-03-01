<template>
  <div>
    <course-info v-bind="courseInfo" v-cloak>
      <el-button type="success" size="small" style="margin-top: 10px; margin-bottom: 10px" @click="uploadScoreVisible = true">上传成绩</el-button>
    </course-info>
    <teacher-broad-casting :release-id="parseInt($route.params['releaseId'])" v-cloak ></teacher-broad-casting>
    <student-list :release-id="parseInt($route.params['releaseId'])" v-cloak></student-list>
    <teacher-assignment-list :release-id="parseInt($route.params['releaseId'])" v-cloak></teacher-assignment-list>
    <forum-content></forum-content>

    <el-dialog :visible.sync="uploadScoreVisible" title="上传成绩">
      <el-form label-position="right">
        <el-form-item>
          <el-upload
            action="string"
            :auto-upload="false"
            :show-file-list="true"
            :http-request="upload"
            :limit="1"
            ref="upload">
            <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="公开" label-width="200px">
          <el-col :span="14">
            <el-switch v-model="publicized"></el-switch>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="text" @click="uploadScoreVisible = false">取消</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="conformUpload">上传到服务器</el-button>
      </div>
    </el-dialog>

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
  import {uploadScores} from "@/api/teacher/teacherCourse";

  export default {
    name: "TeacherRelease",
    data() {
      return {
        courseInfo: null,
        uploadScoreVisible: false,
        publicized: false
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
      },
      upload(data) {
        uploadScores(this.$store.getters.token, this.$route.params['releaseId'], data.file, this.publicized,
        res => {
          this.$message.success("成绩上传成功！");
          this.uploadScoreVisible = false;
          this.init();
        },
        err => {
          this.$message.error("成绩上传失败：" + err.response.data.message)
        })
      },
      conformUpload() {
        this.$refs.upload.submit();
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
