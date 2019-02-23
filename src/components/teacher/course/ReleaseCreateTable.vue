<template>
  <div>
    <el-dialog :visible="true" :before-close="close" title="发布课程">
      <el-form :model="form">
        <el-form-item label="课程时间">
          <el-col :span="7">
            <el-date-picker type="date" placeholder="开始日期" v-model="form.beginDate" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="7">
            <el-date-picker type="date" placeholder="结束日期" v-model="form.endDate" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="班次">
          <el-col :span="7">
            <el-input v-model="form.classOrder"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="是否限选">
          <el-col :span="3">
            <el-switch v-model="form.hasQuota"></el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="限额" v-if="form.hasQuota">
          <el-col :span="7">
            <el-input v-model="form.quota"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="createRelease">确 定</el-button>
      </div>
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
