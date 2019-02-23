<template>
  <div class="login-container">
    <el-form label-position="left" label-width="100px" size="medium">
      <el-form-item label="账号">
        <el-input clearable v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" clearable v-model="password"></el-input>
      </el-form-item>
    </el-form>
    <el-button style="width: 100%;" type="primary" @click="signIn">登录</el-button>
    <el-button style="width: 100%;" type="success" @click="fillIn">快捷登录</el-button>
  </div>
</template>

<script>

  import {login} from "@/api/administrator/admin";

  export default {
    name: "AdminLogin",
    data() {
      return {
        username: "",
        password: ""
      }
    },
    methods: {
      signIn() {
        login(this.username, this.password,
          res => {
            this.$store.dispatch("upIdentification", {
              token: res.data.token,
              userType: 'admin'
            });

            this.$router.push('/admin')
          },
          err => {
            this.$alert(err.response.data.message, "", {
              confirmButtonText: '确定'
            })
          }
        )
      },
      fillIn() {
        this.username = 'admin';
        this.password = '12345';
      }
    }
  }
</script>

<style scoped>
  .login-container{
    width: 300px;
    margin: auto;
    padding-top: 200px;
  }
</style>
