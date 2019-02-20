<template>
  <div class="navi">
    <el-row>
      <el-col :span="4">
        <logo></logo>
      </el-col>
      <el-col :span="6" :offset="14">
        <el-menu :default-active="$route.path" mode="horizontal" @select="handleSelect">
          <el-menu-item index="/teacher/myCourse">我的课程</el-menu-item>
          <el-menu-item index="/teacher/myRelease">课程发布</el-menu-item>
          <el-menu-item index="/teacher/forum">论坛区</el-menu-item>
          <el-submenu index="/teacher">
            <template slot="title"><avatar></avatar></template>
            <el-menu-item index="/teacher/info">个人信息</el-menu-item>
            <el-menu-item index="/teacher/logOut">登出</el-menu-item>
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

  </div>
</template>

<script>

  import Avatar from '../common/Avatar'
  import Logo from '@/components/common/Logo'

  export default {
    name: "TeacherNavi",
    data() {
      return {
        logOutVisible: false
      }
    },
    methods: {
      handleSelect(key, keyPath) {

      },
      logOut() {
        this.logOutVisible = false;
        this.$store.dispatch("clearIdentification");
        this.$router.push("/");
      }
    },
    components: {
      Logo, Avatar
    }
  }

</script>

<style scoped>

</style>
