<template>
  <div>
    <div class="replies">
      <reply-item v-for="(data, index) in replies" v-bind="data" :key="index"></reply-item>
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

  import ReplyItem from "@/components/forum/ReplyItem"

  export default {
    name: "Reply",
    data() {
      return {
      }
    },
    components: {
      ReplyItem
    },
    computed: {

    },
    props: {
      replies: Array,
      totalPage: Number
    },
    methods: {
      processChangePage(page) {
        this.$emit("change", page)
      }
    }
  }
</script>

<style scoped>

</style>
