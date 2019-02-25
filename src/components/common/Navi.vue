<template>
  <el-header style="height: 45px; box-shadow: 0 1px 10px rgba(0,0,0,.1);">
    <el-row>
      <el-col :span="5" style="line-height: 35px; padding: 5px 0">
        <div>
          <logo></logo>
        </div>
      </el-col>
      <el-col :span="5" :offset="14" style="line-height: 35px; padding: 5px 0">
        <div>
          <span style="font-weight: 400">您尚未登录</span>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
  import Logo from './Logo';

  export default {
    name: 'IndexNavi',
    components: {
      Logo
    }
  }

</script>
