<template>
  <div>
    <p>PosterContent</p>
    <poster-main></poster-main>
    <div class="replies">
      <reply></reply>
    </div>
  </div>
</template>

<script>
  import PosterMain from "@/components/forum/PosterMain";
  import Reply from "@/components/forum/Reply";

  export default {
    name: "Poster",
    components: {
      Reply,
      PosterMain

    }
  }
</script>

<style scoped>

</style>
