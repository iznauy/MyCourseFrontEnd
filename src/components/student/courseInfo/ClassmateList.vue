<template>
  <div>
    <h2 style="text-align: left">同学</h2>
    <el-table :data="students" border style="width: 200px;" max-height="500px">
      <el-table-column label="昵称" prop="name" width="100" align="center"></el-table-column>
      <el-table-column label="头像" width="100" align="center">
        <template slot-scope="scope">
          <img :src="getAvatarUrl(scope.row)" width="50" height="50" alt="头像"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {loadClassmates} from "@/api/course";
  import {getUrl} from "@/api/tools/tool";

  export default {
    name: "ClassmateList",
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
        loadClassmates(this.$store.getters.token, this.releaseId,
          res => {
            this.students = res.data;
          })
      },
      getUrl,
      getAvatarUrl(data) {
        if (data)
          return getUrl(data.avatar);
      }
    },
    created() {
      this.getStudents();
    }
  }
</script>

<style scoped>

</style>
