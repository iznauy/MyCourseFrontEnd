<template>
  <div>
    <div v-if="uncheckedCourses !== null">
      <admin-course-item v-for="(data, index) in uncheckedCourses" v-bind="data" :key="index"></admin-course-item>
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
        uncheckedRelease: null
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
