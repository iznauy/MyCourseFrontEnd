<template>
  <div>
    <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 10px;margin-top: 10px; cursor: pointer; background-color: gainsboro">
      <el-container>
        <el-main style="background-color: transparent;">
          <div style="font-weight: 800;font-size: 20px; margin-bottom: 15px" class="center">{{courseName}}</div>
          <div style="color: #717478;font-size: 13px; text-align: left;">{{courseDescription}}</div>
        </el-main>
        <el-aside style=" float: right;">
          <div style="margin: 60px 20px 0 0; font-size: 15px">
            教师：{{teacher}}
          </div>
          <div style="clear: both;"></div>
          <div style="margin: 0 20px 0 0; font-size: 15px">
            <slot></slot>
          </div>
          <div style="clear: both;"></div>
        </el-aside>
      </el-container>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "CourseInfo",
    props: {
      "id": Number,
      "courseName": String,
      "courseDescription": String,
      "teacher": String
    },
    data() {
      return {

      }
    },
    created() {

    },
    watch: {

    },
    methods: {

    },
    components: {

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
