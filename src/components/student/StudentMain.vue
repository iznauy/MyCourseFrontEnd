<template>
  <div>
    <student-navi></student-navi>
    <router-view></router-view>
  </div>
</template>

<script>

  import StudentNavi from "@/components/student/StudentNavi";
  export default {
    name: "StudentMain",
    components: {StudentNavi}
  }
</script>

<style scoped>

</style>
