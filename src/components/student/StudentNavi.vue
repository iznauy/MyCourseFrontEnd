<template>
  <div class="navi">
    <el-row>
      <el-col :span="4">
        <logo></logo>
      </el-col>
      <el-col :span="6" :offset="14">
        <el-menu :default-active="$route.path" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/student/allCourse">全部课程</el-menu-item>
        <el-menu-item index="/student/myCourse">我的课程</el-menu-item>
        <el-submenu index="/student">
          <template slot="title"><avatar></avatar></template>
          <el-menu-item index="/student/info">个人信息</el-menu-item>
          <el-menu-item index="/student/logOff">注销账号</el-menu-item>
          <el-menu-item index="/student/logOut">登出</el-menu-item>
        </el-submenu>
      </el-menu>
      </el-col>
    </el-row>

    <el-dialog title="提示" :visible.sync="logOutVisible" width="20%">
      <span>确定要登出？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="logOutVisible = false">取消</el-button>
        <el-button type="primary" @click="logOut">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="警告⚠️" :visible.sync="logOffVisible" width="20%">
      <span>确定要删除账号？<br>账号删除后数据不会被删除。再次登录需要重新激活</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="logOffVisible = false">取消</el-button>
        <el-button type="primary" @click="logOff">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  import Avatar from '../common/Avatar'
  import Logo from '@/components/common/Logo'
  import {deleteAccount} from "@/api/student/studentInfo";

  export default {
    name: "StudentNavi",
    components: {
      Avatar, Logo
    },
    data() {
      return {
        logOffVisible: false,
        logOutVisible: false
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        if (keyPath.length === 1 || key === '/student/info')
          this.$router.push(key);
        else {
          if (key === '/student/logOff') {
            // 要求用户确认注销账号
            this.logOffVisible = true;
          } else if (key === '/student/logOut') {
            // 要求用户确认注销
            this.logOutVisible = true;
          }
        }
      },
      logOut() {
        this.logOutVisible = false;
        this.$store.dispatch("clearIdentification");
        this.$router.push("/");
      },
      logOff() {
        deleteAccount(this.$store.getters.token,
          () => {
            this.logOffVisible = false;
            this.$store.dispatch("clearIdentification");
            this.$router.push("/");
          },
          res => {
            console.log(res.response)
          }
        )
      }
    }
  }

</script>

<style scoped>
  .navi {
    height: 70px;
    width: auto;
  }
</style>
