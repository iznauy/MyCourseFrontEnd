<template>
  <div>
    <teacher-navi></teacher-navi>
    <router-view></router-view>
  </div>
</template>

<script>
  import TeacherNavi from "@/components/teacher/TeacherNavi"
  export default {
    name: "TeacherMain",
    components: {
      TeacherNavi
    }
  }
</script>

<style scoped>

</style>
