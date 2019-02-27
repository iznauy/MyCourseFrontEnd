<template>
  <div>
    <h2 style="text-align: left">课件</h2>
    <el-table :data="wares" border style="width: 201px">
      <el-table-column label="名称" prop="name" width="120" align="center"></el-table-column>
      <el-table-column align="right" width="80">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" size="small" @click="addWare">添加</el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="download(scope.row)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <ware-create-table v-if="displayCreateTable" :course-id="courseId" @close="displayCreateTable = false"></ware-create-table>
  </div>
</template>

<script>
  import {loadWares} from "@/api/course";
  import WareCreateTable from "@/components/teacher/courseInfo/WareCreateTable";
  import {getUrl} from "@/api/tools/tool";

  export default {
    name: "TeacherCourseWareList",
    props: {
      courseId: Number
    },
    data() {
      return {
        wares: null,
        displayCreateTable: false
      }
    },
    methods: {
      getWares() {
        loadWares(this.$store.getters.token, this.courseId, res => {
          this.wares = res.data;
        },
        err => {})
      },
      addWare() {
        this.displayCreateTable = true;
      },
      download(data) {
        window.open(getUrl(data.path), "_blank");
      }
    },
    created() {
      this.getWares();
    },
    components: {
      WareCreateTable
    }
  }
</script>

<style scoped>

</style>
