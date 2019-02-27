<template>
  <el-dialog title="创建课程" :visible="true" :show-close="false" width="30%">
    <el-form :model="form">
        <el-form-item label="课程名" label-width="60px" label-position="left" size="small" v-show="active === 0">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="40px" label-position="left" v-show="active === 1">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">

      <el-button type="text" @click.stop="cancel">取消</el-button>
      <el-button type="primary" @click.stop="next">{{nextName}}</el-button>
    </div>

    <el-steps :active="active" finish-status="success" align-center="true">
      <el-step title="步骤一"></el-step>
      <el-step title="步骤二"></el-step>
    </el-steps>
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
        },
        active: 0
      }
    },
    methods: {
      next() {
        if (this.active === 0)
          this.active += 1;
        else if (this.active === 1) {
          this.active += 1;
          this.createNewCourse();
        } else {
          this.$router.go(0)
        }
      },
      createNewCourse() {
        createCourse(this.$store.getters.token, this.form.name, this.form.description,
          res => {
            console.log(res);
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
    },
    computed: {
      nextName() {
        if (this.active !== 2)
          return "下一步";
        else
          return "完成";
      }
    }
  }
</script>

<style scoped>

</style>
