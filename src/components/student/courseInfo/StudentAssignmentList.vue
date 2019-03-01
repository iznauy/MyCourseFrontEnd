<template>
  <div>
    <el-table :data="assignments" border style="width: 601px; margin: 0 auto;">
      <el-table-column label="名称" prop="name" width="520" align="center"></el-table-column>
      <el-table-column align="right" width="80">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleView(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <student-assignment-detail :assignment-id="targetId" v-if="displayDetail" @close="displayDetail = false"></student-assignment-detail>
  </div>
</template>

<script>

  import {loadAssignments} from "@/api/course";
  import AssignmentCreateTable from "@/components/teacher/courseInfo/AssignmentCreateTable";
  import StudentAssignmentDetail from "@/components/student/courseInfo/StudentAssignmentDetail";

  export default {
    components: {StudentAssignmentDetail, AssignmentCreateTable},
    props: {
      "releaseId": Number
    },
    name: "StudentCourseAssignmentList",
    data() {
      return {
        assignments: null,
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
        if (data) {
          this.targetId = data.id;
          this.displayDetail = true;
        }
      }
    },
    created() {
      this.getAssignments();
    }
  }
</script>

<style scoped>

</style>
