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
    <div v-if="uncheckedCourses !== null">
      <transition-group name="list" tag="p">
        <admin-course-item v-for="(data, index) in uncheckedCourses" v-bind="data" :key="data.id" v-show="filter(data)"></admin-course-item>
      </transition-group>
    </div>
  </div>
</template>

<script>

  import {uncheckedCourses} from "@/api/administrator/adminCourse";
  import AdminCourseItem from './AdminCourseItem'

  export default {
    name: "AdminCourse",
    data() {
      return {
        uncheckedCourses: null,
        keyWord: ""
      }
    },
    methods: {
      getUncheckedCourses() {
        uncheckedCourses(this.$store.getters.token,
          res => {
            this.uncheckedCourses = res.data
          },
          err => {
            this.$message.error("获取数据失败：" + err.response.data.message);
          }
        )
      },
      filter(data) {
        return (data.name.indexOf(this.keyWord) !== -1) || (data.description.indexOf(this.keyWord) !== -1)
          || (data.creatorEmail.indexOf(this.keyWord) !== -1);
      }
    },
    components: {
      AdminCourseItem
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
