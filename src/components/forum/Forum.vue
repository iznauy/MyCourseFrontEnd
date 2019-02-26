<template>
    <div>
      <el-form :inline="true">
        <el-form-item label="搜索">
          <el-input v-model="keyWord" placeholder="关键字" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="success" @click="keyWord = ''">清除</el-button>
        </el-form-item>
      </el-form>
      <div v-if="availableForums !== null">
        <transition-group name="list" tag="p">
          <forum-item v-for="(data, index) in availableForums" v-bind="data" :key="index" v-show="filter(data)"></forum-item>
        </transition-group>
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
        availableForums: null,
        keyWord: ""
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
      },
      filter(data) {
        return data.name.indexOf(this.keyWord) !== -1;
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
  .list-enter-active{
    transition: all 1s;
  }
  /** 移除过程 **/
  .list-leave-active {
    transition: all 1s;
  }
  /*** 开始插入、移除结束的位置变化 ***/
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
