<template>
  <el-header style="height: 50px; border: 1px solid #D4D4D4; border-radius: 7px;">
    <el-row>
      <el-col :span="5" style="line-height: 40px">
        <div>
          <logo></logo>
        </div>
      </el-col>
      <el-col :span="5" :offset="14" style="line-height: 40px">
        <div style="margin: 5px;">
          <span v-if="$store.getters.notLogin">您尚未登录</span>
          <span v-else-if="$store.getters.teacher">我是一名光荣的老师</span>
          <span v-else-if="$store.getters.student">我是一个被压迫的学生</span>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
  import Logo from '../common/Logo';

  export default {
    name: 'IndexNavi',
    components: {
      Logo
    }
  }

</script>
