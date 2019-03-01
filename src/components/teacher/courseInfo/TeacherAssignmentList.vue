<template>
  <div>
    <h2 style="text-align: left">作业</h2>
    <el-table :data="assignments" border style="width: 341px">
      <el-table-column label="名称" prop="name" width="120" align="center"></el-table-column>
      <el-table-column align="right" width="220">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" size="small" @click="displayCreateTable = true">添加</el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleView(scope.row)">查看</el-button>
          <el-button type="success" size="small" @click="handleDownload(scope.row)">下载</el-button>
          <el-button type="danger" size="small" @click="handleRate(scope.row)">评分</el-button>
        </template>
      </el-table-column>
    </el-table>
    <assignment-create-table v-if="displayCreateTable" :release-id="releaseId" @close="displayCreateTable = false"></assignment-create-table>
    <teacher-assignment-detail v-if="displayDetail" :assignment-id="targetId" @close="displayDetail = false"></teacher-assignment-detail>

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

  import {downloadAssignment, loadAssignments} from "@/api/course";
  import AssignmentCreateTable from "@/components/teacher/courseInfo/AssignmentCreateTable";
  import TeacherAssignmentDetail from "@/components/teacher/courseInfo/TeacherAssignmentDetail";
  import {getUrl} from "@/api/tools/tool";
  import {uploadAssignmentScores} from "@/api/teacher/teacherCourse";

  export default {
    components: {TeacherAssignmentDetail, AssignmentCreateTable},
    props: {
      "releaseId": Number
    },
    name: "TeacherCourseAssignmentList",
    data() {
      return {
        assignments: null,
        displayCreateTable: false,
        displayDetail: false,
        targetId: 0,
        uploadScoreVisible: false,
        publicized: false
      }
    },
    methods: {
      getAssignments() {
        loadAssignments(this.$store.getters.token, this.releaseId,
        res => {
          this.assignments = res.data;
        })
      },
      handleView(data) {
        this.targetId = data.id;
        this.displayDetail = true;
      },
      handleDownload(data) {
        this.targetId = data.id;
        downloadAssignment(this.$store.getters.token, this.targetId,
        res => {
          window.open(getUrl(res.data), "_blank");
        },
        err => {
          console.log(err.response);
        })
      },
      handleRate(data) {
        this.targetId = data.id;
        this.uploadScoreVisible = true;
      },
      upload(data) {
        uploadAssignmentScores(this.$store.getters.token, this.targetId, data.file, this.publicized,
        res => {
          this.$message.success("成绩上传成功！");
          this.uploadScoreVisible = false;
          },
        err => {
          this.$message.error("成绩上传失败：" + err.response.data.message)
        })
      },
      conformUpload() {
        this.$refs.upload.submit();
      }
    },
    created() {
      this.getAssignments();
    }
  }
</script>

<style scoped>

</style>
