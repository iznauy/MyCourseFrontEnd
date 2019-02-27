<template>
  <div>
    <h2 style="text-align: left">课件</h2>
    <el-table :data="wares" border style="width: 201px" max-height="500px">
      <el-table-column label="名称" prop="name" width="120" align="center"></el-table-column>
      <el-table-column align="right" width="80">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="download(scope.row)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {loadWares} from "@/api/course";
  import {getUrl} from "@/api/tools/tool";

  export default {
    name: "TeacherCourseWareList",
    props: {
      courseId: Number
    },
    data() {
      return {
        wares: null
      }
    },
    methods: {
      getWares() {
        loadWares(this.$store.getters.token, this.courseId, res => {
            this.wares = res.data;
          },
          err => {})
      },
      download(data) {
        window.open(getUrl(data.path), "_blank");
      }
    },
    created() {
      this.getWares();
    }
  }
</script>

<style scoped>

</style>
