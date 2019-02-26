<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="搜索">
        <el-input v-model="keyWord" placeholder="关键字" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="success" @click="keyWord = ''">清除</el-button>
      </el-form-item>
    </el-form>
    <div v-if="uncheckedRelease !== null">
      <transition-group>
        <admin-release-item v-for="(data, index) in uncheckedRelease" v-bind="data" :key="data.id" v-show="filter(data)"></admin-release-item>
      </transition-group>
    </div>
  </div>
</template>

<script>

  import {uncheckedCourseReleases} from "@/api/administrator/adminCourse";
  import AdminReleaseItem from './AdminReleaseItem'

  export default {

    name: "AdminRelease",
    data() {
      return {
        uncheckedRelease: null,
        keyWord: ""
      }
    },
    methods: {
      getUncheckedCourses() {
        uncheckedCourseReleases(this.$store.getters.token,
          res => {
            this.uncheckedRelease = res.data
          },
          err => {
            this.$message.error("获取数据失败：" + err.response.data.message);
          }
        )
      },
      filter(data) {
        return (data.courseName.indexOf(this.keyWord) !== -1) || (data.creatorEmail.indexOf(this.keyWord) !== -1);
      }
    },
    components: {
      AdminReleaseItem
    },
    created() {
      console.log("create component");
      this.getUncheckedCourses();
    },
    watch: {
      '$router': 'getUncheckedCourses'
    }
  }
</script>

<style scoped>
</style>
