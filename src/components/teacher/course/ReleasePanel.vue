<template>
  <div>
    <el-table :data="historyRelease" border="" style="width: 661px; margin: 0 auto;" max-height="300px" height="300px">
      <el-table-column prop="classOrder" label="班次" width="50px" align="center"></el-table-column>
      <el-table-column prop="begin" label="开始时间" width="100px" align="center"></el-table-column>
      <el-table-column prop="end" label="结束时间" width="100px" align="center"></el-table-column>
      <el-table-column prop="check" label="是否审批" width="80px" align="center"></el-table-column>
      <el-table-column prop="approve" label="审批结果" width="80px" align="center"></el-table-column>
      <el-table-column prop="hasQuota" label="限选" width="60px" align="center"></el-table-column>
      <el-table-column prop="quota" label="限选人数" width="80px" align="center"></el-table-column>
      <el-table-column prop="count" label="已选" width="60ox" align="center"></el-table-column>
      <el-table-column
        label="操作" width="50px">
        <template slot-scope="scope">
          <el-button
            @click.naive.prevent="goToReleaseInfo(scope.row)" type="text" size="small">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getCourseReleases} from "@/api/teacher/teacherCourse";

  export default {
    name: "ReleasePanel",
    props: {
      courseId: Number
    },
    data() {
      return {
        historyRelease: null
      }
    },
    methods: {
      convertRawData(data) {
        const result = {};
        result.courseId = data.courseId;
        result.id = data.id;
        result.begin = data.begin.split(" ")[0];
        result.end = data.end.split(" ")[0];
        result.classOrder = data.classOrder;
        if (data.check) {
          result.check = "是";
          if (data.approve) {
            result.approve = '已通过';
            result.count = data.count;
          }
          else {
            result.approve = '未通过';
            result.count = '-';
          }
        } else {
          result.check = "否";
          result.approve = '-';
          result.count = '-';
        }
        if (data.hasQuota) {
          result.hasQuota = '是';
          result.quota = data.quota;
        } else {
          result.hasQuota = '否';
          result.quota = '-';
        }
        return result;
      },
      getHistoryRelease() {
        getCourseReleases(this.$store.getters.token, this.courseId,
          res => {
            this.historyRelease = [];
            for (let i = 0; i < res.data.length; i++) {
              this.historyRelease[i] = this.convertRawData(res.data[i])
            }
          },
          error => {
            console.log(error.response)
          })
      },
      goToReleaseInfo(row) {
        this.$router.push("/teacher/course/" + row.courseId + "/" + row.id);
      }
    },
    created() {
      this.getHistoryRelease()
    }
  }
</script>

<style scoped>

</style>
