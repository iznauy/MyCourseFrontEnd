<template>
  <div>
    <div v-if="uncheckedRelease !== null">
      <admin-release-item v-for="(data, index) in uncheckedRelease" v-bind="data" :key="index"></admin-release-item>
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
        uncheckedRelease: null
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
