<template>
  <div class="panel">
    <h2>验证</h2>
    <el-form :model="validationForm" ref="validationForm" :rules="rules" class="form" label-width="80px">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="validationForm.email" size="small"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-col :span="13">
          <el-input v-model="validationForm.code" size="small"></el-input>
        </el-col>
        <el-col :span="5" :offset="2">
          <el-button type="primary" @click="getValidationCode" size="small">获取</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="validationForm.userType">
          <el-radio label="student">学生</el-radio>
          <el-radio label="teacher">老师</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label-width="0px">
        <el-button type="primary" @click="validateAccount" size="medium">验证</el-button>
      </el-form-item>
      <el-row>
        <el-button class="signUp-button" type="text" @click="toLogin">已有账号？</el-button>
      </el-row>
      <el-row>
        <el-button class="validation-button" type="text" @click="toRegister">没有账号？</el-button>
      </el-row>
    </el-form>

  </div>
</template>


<script>

  import {requestValidationCode, validation} from "./../../api/user";

  export default {
    name: "ValidationPanel",
    data() {

      const validateEmail = (rule, value, callback) => {
        const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error('邮箱不合法'));
        }
      };

      return {
        validationForm: {
          email: '',
          code: '',
          userType: 'student'
        },
        rules: {
          email: [
            {validator: validateEmail, trigger: 'blur'},
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          code: [
            {required: true, min: 6, max: 6, message: '验证码的长度为6位', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      getValidationCode() {
        requestValidationCode(this.validationForm.email, this.validationForm.userType,
          () => {
            this.$alert("验证码发送成功，请前往邮箱查收", "", {
              confirmButtonText: '确定'
            })
        }, error => {
            this.$alert(error.response.data.message, "", {
              confirmButtonText: '确定'
            })
          })
      },
      validateAccount() {
        this.$refs['validationForm'].validate((valid) => {
          if (valid) {
            validation(this.validationForm.email, this.validationForm.userType, this.validationForm.code,
              res => {
                this.$store.dispatch("upIdentification", {
                  token: res.data.token,
                  userType: this.validationForm.userType
              });
                this.$router.push("/" + this.validationForm.userType)
              },
              error => {
                this.$alert(error.response.data.message, "", {
                  confirmButtonText: '确定'
                })
              }
            )
          } else {
            this.$alert("请正确填写表单", "", {
              confirmButtonText: '确定'
            })
          }
        })
      },
      toLogin() {
        this.$router.push('/index/login')
      },
      toRegister() {
        this.$router.push('/index/register')
      }
    }
  }
</script>

<style scoped>

  .panel {
    width: 500px;
    text-align: center;
    margin: 100px auto;
  }
  .form {
    width: 240px;
    margin: 40px auto 0 auto;
  }

</style>
