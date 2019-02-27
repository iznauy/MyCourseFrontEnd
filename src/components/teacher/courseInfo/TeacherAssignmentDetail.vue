<template>
  <div>
    <el-dialog :visible="true" :before-close="close" title="作业" width="40%">
      <el-form style="width: 90%; margin: 5px auto" label-position="left">
        <el-form-item label="名称" label-width="60px" label-position="left" size="small">
          <el-input v-model="form.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="60px" label-position="left">
          <el-input type="textarea" v-model="form.description" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="DDL" label-width="40px" label-position="left">
          <el-date-picker type="date" :disabled="true" placeholder="截止日期" v-model="form.deadLine" size="small"></el-date-picker>
        </el-form-item>
        <el-form-item label-width="60px" label="已提交" label-position="left" size="small">
          <el-input v-model="state['commitCount']" type="text" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {loadAssignmentsDetail, loadClassAssignmentState} from "@/api/course";

  export default {
    name: "TeacherAssignmentDetail",
    props: {
      "assignmentId": Number
    },
    data() {
      return {
        form: null,
        state: null
      }
    },
    methods: {
      getAssignmentDetail() {
        loadAssignmentsDetail(this.$store.getters.token, this.assignmentId,
        res => {
          this.form = res.data;
        },
        err => {
          console.log(err.response)
        })
      },
      getAssignmentState() {
        loadClassAssignmentState(this.$store.getters.token, this.assignmentId,
        res => {
          this.state = res.data;
        },
        err => {
          console.log(err.response)
        })
      },
      getInfo() {
        this.getAssignmentDetail();
        this.getAssignmentState();
      },
      close() {
        this.$emit('close')
      }
    },
    created() {
      this.getInfo();
    }
  }
</script>

<style scoped>

</style>
