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
  </div>
</template>

<script>

  import {downloadAssignment, loadAssignments} from "@/api/course";
  import AssignmentCreateTable from "@/components/teacher/courseInfo/AssignmentCreateTable";
  import TeacherAssignmentDetail from "@/components/teacher/courseInfo/TeacherAssignmentDetail";
  import {getUrl} from "@/api/tools/tool";

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
        targetId: 0
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
        console.log(data)
      }
    },
    created() {
      this.getAssignments();
    }
  }
</script>

<style scoped>

</style>
