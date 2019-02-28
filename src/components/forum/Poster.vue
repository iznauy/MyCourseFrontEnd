<template>
  <div>
    <p>PosterContent</p>
    <poster-main></poster-main>
    <div class="replies">
      <reply-list></reply-list>
    </div>
  </div>
</template>

<script>
  import PosterMain from "@/components/forum/PosterMain";
  import ReplyList from "@/components/forum/ReplyList";

  export default {
    name: "Poster",
    components: {
      ReplyList,
      PosterMain

    }
  }
</script>

<style scoped>

</style>
