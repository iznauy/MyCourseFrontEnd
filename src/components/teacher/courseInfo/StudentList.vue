<template>
  <div>
    <el-table :data="students" border style="width: 601px; margin: 0 auto;" max-height="300" height="300">
      <el-table-column label="昵称" prop="name" width="100" align="center"></el-table-column>
      <el-table-column label="邮箱" width="220" prop="email" align="center"></el-table-column>
      <el-table-column label="学号" width="140" prop="number" align="center"></el-table-column>
      <el-table-column label="头像" width="140" align="center" prop="avatar">
        <template slot-scope="scope">
          <img :src="getAvatar(scope.row)" width="50" height="50" alt="头像"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {loadClassStudents} from "@/api/course";
  import {getUrl} from "@/api/tools/tool";

  export default {
    name: "StudentList",
    props: {
      releaseId: Number
    },
    data() {
      return {
        students: null
      }
    },
    methods: {
      getStudents() {
        loadClassStudents(this.$store.getters.token, this.releaseId,
        res => {
          this.students = res.data;
        })
      },
      getAvatar(row) {
        if (row)
          return getUrl(row.avatar)
      }
    },
    created() {
      this.getStudents();
    }
  }
</script>

<style scoped>

</style>
