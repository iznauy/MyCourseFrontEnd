<template>
  <div>
    <div class="posters">
      <poster-item v-for="(data, index) in posts" v-bind="data" :key="index"></poster-item>
    </div>
    <div class="block" style="margin: 20px 0;">
      <el-pagination
        layout="prev, pager, next"
        :page-count="totalPage" @current-change="processChangePage">
      </el-pagination>
    </div>
  </div>
</template>

<script>

  import ForumItem from "@/components/forum/ForumItem"
  import PosterItem from "@/components/forum/PosterItem";

  export default {
    name: "PosterItemList",
    props: {
      posts: Array,
      totalPage: Number
    },
    data() {
      return {

      }
    },
    methods: {
      processChangePage(page) {
        this.$emit("change", page)
      }
    },
    components: {
      PosterItem,
      ForumItem
    },
    computed: {
    }
  }
</script>

<style scoped>

</style>
