<template>
  <div>
    <bar-chart :x-data="names" :data="values" :name="['数量对比']" unique-id="2" title="课程统计"></bar-chart>
  </div>
</template>

<script>

  import BarChart from "@/components/admin/statistics/BarChart";
  import {loadCourseAndReleases} from "@/api/administrator/adminStatistics";

  export default {
    name: "CourseBarChart",
    components: {
      BarChart
    },
    data() {
      return {
        names: ["课程", "课程发布"],
        values: [[]]
      }
    },
    methods: {
      getData() {
        loadCourseAndReleases(this.$store.getters.token, res => {
          let data = res.data;
          this.values[0].push(data['courseCount']);
          this.values[0].push(data['releaseCount']);
        })
      }
    },
    created() {
      this.getData();
    }
  }
</script>

<style scoped>

</style>
