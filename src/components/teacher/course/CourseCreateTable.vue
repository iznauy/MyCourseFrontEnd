<template>
  <el-dialog title="创建课程" :visible="true" :show-close="false">
    <el-form :model="form">
        <el-form-item label="课程名" :label-width="'120px'">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="'120px'">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">

      <el-button type="text" @click="cancel">取消</el-button>
      <el-button type="primary" @click="createNewCourse">提交</el-button>
    </div>

  </el-dialog>
</template>

<script>

  import {createCourse} from "@/api/teacher/teacherCourse";

  export default {
    name: "CourseCreateTable",
    data() {
      return {
        form: {
          name: '',
          description: ''
        }
      }
    },
    methods: {
      createNewCourse() {
        createCourse(this.$store.getters.token, this.form.name, this.form.description,
          res => {
            this.$router.go(0)
          },
          error => {
            this.$alert(error.response.data.message, "", {
              confirmButtonText: '确定'
            })
          })
      },
      cancel() {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>

</style>
