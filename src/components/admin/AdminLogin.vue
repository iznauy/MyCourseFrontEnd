<template>
  <div>
    <index-navi></index-navi>
    <div class="login-container">
      <h2>内部通道</h2>
      <el-form label-width="40px" class="form">
        <el-form-item label="账号">
          <el-input size="small" v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" size="small" v-model="password"></el-input>
        </el-form-item>
        <el-form-item label-width="0px">
          <el-button type="primary" @click="signIn" size="medium" style="margin-top: 15px">登录</el-button>
        </el-form-item>
        <el-form-item label-width="0px" >
          <el-button type="success" @click="fillIn" size="small">快捷登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

  import {login} from "@/api/administrator/admin";
  import IndexNavi from "@/components/common/Navi";

  export default {
    name: "AdminLogin",
    components: {IndexNavi},
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
        this.signIn();
      }
    }
  }
</script>

<style scoped>
  .login-container{
    width: 300px;
    margin: auto;
    padding-top: 150px;
  }
  .form {
    width: 200px;
    margin: 50px auto 0 auto;
  }
</style>
