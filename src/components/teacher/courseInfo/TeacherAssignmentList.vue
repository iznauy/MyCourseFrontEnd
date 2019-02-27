<template>
  <div>
    <el-table :data="assignments" border style="width: 341px">
      <el-table-column label="名称" prop="name" width="120" align="center"></el-table-column>
      <el-table-column align="right" width="220">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" size="small" @click="displayCreateTable = true">添加</el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="primary" size="small">查看</el-button>
          <el-button type="success" size="small">下载</el-button>
          <el-button type="danger" size="small">评分</el-button>
        </template>
      </el-table-column>
    </el-table>
    <assignment-create-table v-if="displayCreateTable" :release-id="releaseId" @close="displayCreateTable = false"></assignment-create-table>
  </div>
</template>

<script>

  import {loadAssignments} from "@/api/course";
  import AssignmentCreateTable from "@/components/teacher/courseInfo/AssignmentCreateTable";

  export default {
    components: {AssignmentCreateTable},
    props: {
      "releaseId": Number
    },
    name: "TeacherCourseAssignmentList",
    data() {
      return {
        assignments: null,
        displayCreateTable: false
      }
    },
    methods: {
      getAssignments() {
        loadAssignments(this.$store.getters.token, this.releaseId,
        res => {
          this.assignments = res.data;
        })
      }
    },
    created() {
      this.getAssignments();
    }
  }
</script>

<style scoped>

</style>
