<template>
  <div>
    <el-card class="poster-item" :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 10px; margin-top: 10px">
      <div slot="header">
        <h2 style="text-align: left;">{{title}}</h2>
      </div>
      <el-container>
        <el-aside style="width: 150px;">
          <el-card  v-popover:userInfo>
            <div>
              <img :src="avatar" height="100px" width="100px"/>
            </div>
            <div style="margin-top: 10px">
              <span v-if="creatorType === 'teacher'" style="font-weight: 400; color: red;">{{creatorUsername}}</span>
              <span v-if="creatorType === 'student'">{{creatorUsername}}</span>
            </div>
          </el-card>
        </el-aside>
        <el-container>
          <el-main>
            <div style="text-align: left; font-size: 15px; font-weight: 800">
              {{content}}
            </div>
          </el-main>
          <el-footer style="float: right; text-align: right; margin: 0 20px 0 0; padding: 10px 0 10px 0;" height="40px">
            <div style="font-size: 10px">
              <span>发布于：{{createTime}}</span>
            </div>
          </el-footer>
        </el-container>
      </el-container>
    </el-card>
    <el-popover placement="top-start" width="500" trigger="hover"
                ref="userInfo">
      <el-container style="color: black">
        <el-aside style="text-align: left; margin: 20px 0 0 20px; width: 100px;">
          <div>
            <img :src="avatar" width="100px" height="100px"/>
          </div>
        </el-aside>
        <el-main>
          <div style="text-align: left; font-size: 18px; margin-top: 5px; margin-left: 10px">
            用户名：{{creatorUsername}}
          </div>
          <div style="text-align: left; font-size: 15px; margin-top: 10px; margin-left: 10px">
            身份：{{creatorTypeInfo}}
          </div>
          <div style="text-align: left; font-size: 15px; margin-top: 10px; margin-left: 10px">
            邮箱：{{creatorEmail}}
          </div>
        </el-main>
      </el-container>
    </el-popover>
  </div>
</template>

<script>
  import {getUrl} from "@/api/tools/tool";

  export default {
    name: "PosterMain",
    props: {
      id: Number,
      creatorEmail: String,
      creatorType: String,
      creatorUsername: String,
      creatorAvatar: String,
      title: String,
      createTime: String,
      content: String
    },
    computed: {
      creatorTypeInfo() {
        if (this.creatorType === 'teacher')
          return "老师";
        return "学生";
      },
      avatar() {
        return getUrl(this.creatorAvatar);
      }
    },
  }
</script>

<style scoped>

</style>
