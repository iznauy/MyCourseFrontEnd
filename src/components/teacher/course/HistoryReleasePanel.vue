<template>
  <div>
    <el-dialog title="历史发布" :visible="true" :before-close='close'>
      <el-table :data="historyRelease">
        <el-table-column prop="begin" label="开始时间" width="80px"></el-table-column>
        <el-table-column prop="end" label="结束时间" width="80px"></el-table-column>
        <el-table-column prop="approve" label="是否审批" width="80px"></el-table-column>
        <el-table-column prop="check" label="审批结果" width="80px"></el-table-column>
        <el-table-column prop="classOrder" label="班次" width="50px"></el-table-column>
        <el-table-column prop="hasQuota" label="限选" width="50px"></el-table-column>
        <el-table-column prop="quota" label="限选人数" width="80px"></el-table-column>
        <el-table-column prop="count" label="已选" width="50ox"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>

  import {getCourseReleases} from "@/api/teacher/teacherCourse";

  export default {
    props: {
      courseId: Number
    },
    name: "HistoryReleasePanel",
    data() {
      return {
        historyRelease: null
      }
    },
    methods: {
      getHistoryRelease() {
        getCourseReleases(this.$store.getters.token, this.courseId,
        res => {
          this.historyRelease = res.data
        },
        error => {
          console.log(error.response)
        })
      },
      close() {
        console.log("adada");
        this.$emit('close')
      }
    },
    created() {
      this.getHistoryRelease()
    }
  }
</script>

<style scoped>

</style>
