<template>
  <div>
    <el-form style="width: 300px" label-width="40px">
      <el-form-item label="邮箱">
        <el-input v-model="email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="userType">
          <el-radio label="student">学生</el-radio>
          <el-radio label="teacher">老师</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
      <el-row>
        <el-button class="signUp-button" type="text" @click="toSignUp">没有账号？</el-button>
      </el-row>
      <el-row>
        <el-button class="validation-button" type="text" @click="toValidation">没有激活？</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>

  import {login} from "../../api/user";

  export default {

    name: "LoginPanel",
    data() {
      return {
        email: '',
        password: '',
        userType: 'student'
      }
    },
    methods: {
      login() {
        login(this.email, this.password, this.userType,
          res => {
            this.$store.dispatch("upIdentification", {
              token: res.data.token,
              userType: this.userType
            });
            console.log("state change")
          },
          error => {
            this.$alert(error.response.data.message, "", {
              confirmButtonText: '确定'
            })
          }
        )
      },
      toSignUp() {
        this.$store.dispatch("signInState/toRegister")
      },
      toValidation() {
        this.$store.dispatch("signInState/toValidation")
      }
    }
  }

</script>
