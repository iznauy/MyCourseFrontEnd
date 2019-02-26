<template>
  <div class="navi">
    <el-menu
      :default-active="$router.path"
      mode="horizontal"
      @select="handleSelect"
      class="float_right" style="position: relative; top: -2px;">
      <el-menu-item index="/admin/checkCourse">审批课程</el-menu-item>
      <el-menu-item index="/admin/checkRelease">审批发布</el-menu-item>
      <el-menu-item index="/admin/statistics">站长统计</el-menu-item>
      <el-menu-item index="/admin/logOut">登出</el-menu-item>
    </el-menu>
  </div>
</template>

<script>

  import Logo from "@/components/common/Logo";

  export default {

    name: "AdminNavi",
    components: {
      Logo
    },
    data() {
      return {

      }
    },
    methods: {
      handleSelect(key) {
        if (key === '/admin/logOut') {
          this.$store.dispatch("clearIdentification");
          this.$router.push("/inside");
        } else
          this.$router.push(key)
      },
      logOut() {
        this.logOutVisible = false;
        this.$store.dispatch("clearIdentification");
        this.$router.push("/inside");
      }
    }

  }

</script>

<style scoped>
  .navi {
    height: 70px;
    width: auto;
  }
  .float_right {
    float: right;
  }
</style>
