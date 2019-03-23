<template>
  <div>
    <user-pie-chart></user-pie-chart>
    <course-bar-chart></course-bar-chart>
  </div>
</template>

<script>

  import UserPieChart from "@/components/admin/statistics/UserPieChart";
  import CourseBarChart from "@/components/admin/statistics/CourseBarChart";

  export default {
    name: "AdminStatistics",
    components: {
      UserPieChart, CourseBarChart
    }
  }
</script>

<style scoped>

</style>
