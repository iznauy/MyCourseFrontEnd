<template>
    <div>
      <div v-if="availableForums !== null">
        <forum-item v-for="(data, index) in availableForums" v-bind="data" :key="index"></forum-item>
      </div>
    </div>
</template>

<script>

  import {loadAvailableForums} from "@/api/forum/forum";
  import ForumItem from "@/components/forum/ForumItem";

  export default {
    name: "Forum",
    components: {ForumItem},
    data() {
      return {
        availableForums: null
      }
    },
    methods: {
      getAvailableForums() {
        loadAvailableForums(this.$store.getters.token,
        res => {
          this.availableForums = res.data;
        },
        err => {
          this.$message.error("获取信息失败：" + err.response.data.message);
        })
      }
    },
    created() {
      this.getAvailableForums();
    },
    watch: {
      '$router': 'getAvailableForums'
    }
  }
</script>

<style scoped>

</style>
