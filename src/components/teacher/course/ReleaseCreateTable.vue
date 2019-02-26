<template>
  <div>
    <el-dialog :visible="true" :before-close="close" title="发布课程" width="40%">
      <el-form :model="form" style="width: 90%; margin: 5px auto" label-position="left">
        <el-form-item label="课程时间" label-width="80px">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="开始日期" v-model="form.beginDate" size="small" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="结束日期" v-model="form.endDate" size="small" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="班次" label-width="80px">
            <el-input v-model="form.classOrder" size="small" type="text"></el-input>
        </el-form-item>
        <el-form-item label="是否限选" label-width="80px">
          <el-col :span="8">
            <el-switch v-model="form.hasQuota"></el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="限额" v-if="form.hasQuota" label-width="80px" size="small">
          <el-col>
            <el-input v-model="form.quota"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="close" size="small">取 消</el-button>
          <el-button type="primary" @click="createRelease" size="small">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

  import {createCourseRelease} from "@/api/teacher/teacherCourse";

  export default {
    props: {
      courseId: Number
    },
    name: "ReleaseCreateTable",
    data() {
      return {
        form: {
          beginDate: "",
          endDate: "",
          classOrder: 0,
          hasQuota: false,
          quota: 0
        }
      }
    },
    methods: {
      close() {
        this.$emit("close")
      },
      createRelease() {
        createCourseRelease(this.$store.getters.token, this.courseId, this.form.beginDate, this.form.endDate,
          this.form.classOrder, this.form.hasQuota, this.form.quota,
          res => {
            this.$emit("close");
            this.$router.go(0)
          },
          err => {
            this.$alert(err.response.data.message, "", {
              confirmButtonText: '确定'
            })
          });
      }
    }
  }

</script>

<style scoped>

</style>
