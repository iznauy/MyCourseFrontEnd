<template>
  <div class="panel">
    <h2>登录</h2>
    <el-form class="form" label-width="40px">
      <el-form-item label="邮箱">
        <el-input v-model="email" size="small"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" type="password" size="small"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="userType">
          <el-radio label="student">学生</el-radio>
          <el-radio label="teacher">老师</el-radio>
        </el-radio-group>
      </el-form-item>

    </el-form>
    <el-form>
      <el-form-item>
        <el-button type="primary" @click="login" size="medium" >登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="teacherQuickLogin" size="medium">一键老师</el-button>
        <el-button type="success" @click="studentQuickLogin" size="medium">一键学生</el-button>
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

  import {login, getOwnAvatar} from "../../api/user";

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
      teacherQuickLogin() {
        this.email = "zy05160516@126.com";
        this.password = "iznauy.top";
        this.userType = 'teacher';
        this.login();
      },
      studentQuickLogin() {
        this.email = "161250220@smail.nju.edu.cn";
        this.password = "iznauy";
        this.userType = 'student';
        this.login();
      },
      login() {
        login(this.email, this.password, this.userType,
          res => {
            this.$store.dispatch("upIdentification", {
              token: res.data.token,
              userType: this.userType
            });

            this.$router.push("/" + this.userType)

            getOwnAvatar(this.$store.getters.token,
              re => {
                this.$store.dispatch("updateAvatar", re.data.avatar)
              }
            )
          },
          error => {
            this.$alert(error.response.data.message, "", {
              confirmButtonText: '确定'
            })
          }
        )
      },
      toSignUp() {
        this.$router.push('/index/register')
      },
      toValidation() {
        this.$router.push('/index/validation')
      }
    }
  }

</script>

<style scoped>

  .panel {
    width: 300px;
    text-align: center;
    margin: 100px auto;
  }
  .form {
    width: 200px;
    margin: 50px auto 0 auto;
  }

</style>
