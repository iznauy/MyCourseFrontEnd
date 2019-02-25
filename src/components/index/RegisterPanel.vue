<template>
  <div class="panel">
    <h2>注册</h2>
    <el-form :model="form" :rules="rules" class="form" label-width="60px" ref="form">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" size="small"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" size="small"></el-input>
      </el-form-item>
      <el-form-item label="重复" prop="checkPass">
        <el-input v-model="form.checkPass" type="password" size="small"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.userType">
          <el-radio label="student">学生</el-radio>
          <el-radio label="teacher">老师</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label-width="0px">
        <el-button type="primary" @click="signUp" size="medium">注册</el-button>
      </el-form-item>
      <el-row>
        <el-button class="signUp-button" type="text" @click="toLogin">已有账号？</el-button>
      </el-row>
      <el-row>
        <el-button class="validation-button" type="text" @click="toValidation">没有激活？</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>

  import {register} from '../../api/user'

  export default {
    name: 'RegisterPanel',
    data() {
      const confirmPassword = (rule, value, callback) => {
        if (value !== this.form.password) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      };
      const validateEmail = (rule, value, callback) => {
        const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error('邮箱不合法'));
        }
      };

      return {
        form: {
          email: '',
          password: '',
          checkPass: '',
          userType: 'student'
        },
        rules: {
          checkPass: [
            {validator: confirmPassword, trigger: 'blur'},
            {required: true, message: '请再次输入密码', trigger: 'blur'}
          ],
          email: [
            {validator: validateEmail, trigger: 'blur'},
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          password: [
            {required: true, message: "请输入密码", trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      signUp() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            register(this.form.email, this.form.password, this.form.userType,
              res => {
                console.log("注册成功，转移到激活页面");
                console.log(res);
                this.$router.push('/index/validation')
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
      toValidation() {
        this.$router.push('/index/validation')
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
    width: 220px;
    margin: 40px auto 0 auto;
  }
</style>
