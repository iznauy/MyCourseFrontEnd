<template>
  <div @click="processClick">
    <el-card  :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 10px;margin-top: 10px; cursor: pointer;">
      <el-container>
        <el-container>
          <el-main style="background-color: transparent;">
            <div style="font-weight: 800;font-size: 15px; margin-bottom: 10px" class="center">{{name}}</div>
            <div style="color: #717478;font-size: 13px; text-align: left; margin-bottom: 10px">{{abstractDescription}}</div>
            <div style="text-align: left; font-size: 10px; margin-bottom: 10px">创建日期：{{createDate}}
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-card>
  </div>
</template>

<script>
  export default {
    props: {
      "name": String,
      "courseId": Number,
      "description": String,
      "createDate": String
    },
    name: "ForumItem",
    data() {
      return {
      }
    },
    methods: {
      processClick() {
        this.$router.push("/" + this.$store.getters.userType + "/forum/" + this.courseId);
      }
    },
    computed: {
      abstractDescription() {
        if (this.description.length < 50)
          return this.description;
        else
          return this.description.substr(0, 50) + "...";
      }
    }
  }
</script>

<style scoped>
  .center {
    display:flex;
    /*justify-content:center;*/
    align-items:center;
  }
</style>
