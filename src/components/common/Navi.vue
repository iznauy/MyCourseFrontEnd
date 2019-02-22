<template>
  <el-header style="height: 50px; box-shadow: 0 1px 10px rgba(0,0,0,.1);">
    <el-row>
      <el-col :span="5" style="line-height: 40px">
        <div>
          <logo></logo>
        </div>
      </el-col>
      <el-col :span="5" :offset="14" style="line-height: 40px">
        <div style="margin: 5px;">
          <span v-if="$store.getters.notLogin">您尚未登录</span>
          <span v-else="$store.getters.notLogin">
            <avatar></avatar>
          </span>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
  import Logo from './Logo';
  import Avatar from './Avatar'

  export default {
    name: 'IndexNavi',
    components: {
      Logo, Avatar
    }
  }

</script>
