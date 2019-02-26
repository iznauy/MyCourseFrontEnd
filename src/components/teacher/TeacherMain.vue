<template>
  <div>
    <teacher-navi></teacher-navi>
    <div style="clear:both"></div>
    <router-view style="width: 60%; margin: 30px auto; padding: 20px; box-shadow: 0px 0px 1px 2px rgba(0,0,0,.1);"></router-view>
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
