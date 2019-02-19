<template>
  <div class="navi">
    <el-row>
      <el-col :span="4">
        <logo></logo>
      </el-col>
      <el-col :span="6" :offset="14">
        <el-menu mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">全部课程</el-menu-item>
        <el-menu-item index="2">我的课程</el-menu-item>
        <el-submenu index="3">
          <template slot="title"><avatar></avatar></template>
          <el-menu-item index="3-1">个人信息</el-menu-item>
          <el-menu-item index="3-2">注销账号</el-menu-item>
          <el-menu-item index="3-3">登出</el-menu-item>
        </el-submenu>
      </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import Avatar from '../common/Avatar'
  import Logo from '@/components/common/Logo'

  export default {
    name: "StudentNavi",
    components: {
      Avatar, Logo
    },
    data() {
      return {

      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key);
        console.log(keyPath)
      }
    }
  }

</script>

<style scoped>
  .navi {
    height: 60px;
    width: auto;
  }
</style>
