<template>
  <div>
    <student-navi></student-navi>
    <div style="clear:both"></div>
    <router-view style="background-color: rgb(246, 249, 250); width: 60%; margin: 30px auto; padding: 20px; box-shadow: 0px 0px 1px 2px rgba(0,0,0,.1);"></router-view>
  </div>
</template>

<script>

  import StudentNavi from "@/components/student/StudentNavi";
  export default {
    name: "StudentMain",
    components: {
      StudentNavi
    }
  }
</script>

<style scoped>

</style>
