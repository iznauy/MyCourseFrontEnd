<template>
  <div>
    <el-dialog :visible="true" :before-close="close" title="发布作业" width="40%">
      <el-form :model="form" style="width: 90%; margin: 5px auto" label-position="left">
        <el-form-item label="名称" label-width="40px" label-position="left" size="small">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="40px" label-position="left">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="DDL" label-width="40px" label-position="left">
          <el-date-picker type="date" placeholder="截止日期" v-model="form.deadLine" size="small"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="close" size="small">取 消</el-button>
          <el-button type="primary" @click="createAssignment" size="small">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

  import {releaseAssignment} from "@/api/course";

  export default {
    props: {
      "releaseId": Number
    },
    name: "AssignmentCreateTable",
    data() {
      return {
        form: {
          name: "",
          description: "",
          deadLine: ""
        }
      }
    },
    methods: {
      close() {
        this.$emit('close')
      },
      createAssignment() {
        releaseAssignment(this.$store.getters.token, this.releaseId, this.form.name, this.form.description,
        this.form.deadLine,
        res => {
          this.close();
          this.$router.go(0);
        },
        err => {
          console.log(err.response)
        })
      }
    }
  }

</script>

<style scoped>

</style>
