<template>
  <div style="width: 200px; text-align: center; margin: 0 auto;">
    <el-form style="width: 300px;" label-width="40px">
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
      <el-form-item>
        <el-button type="success" @click="quickLogin">快捷登录</el-button>
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
      quickLogin() {
        this.email = "161250220@smail.nju.edu.cn";
        this.password = "iznauy";
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
                console.log(re);
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
