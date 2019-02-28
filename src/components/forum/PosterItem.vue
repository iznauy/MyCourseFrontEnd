<template>
  <div @click="toPoster">
    <el-card class="poster-item" :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 10px; margin-top: 10px">
      <el-container>
        <el-aside style="text-align: left; margin: 20px 0 0 20px; width: 50px;">
          <div>
            <img v-popover:userInfo :src="avatar" width="50px" height="50px"/>
          </div>
        </el-aside>
        <el-main>
          <div style="text-align: left; font-size: 15px; font-weight: 800">
            {{title}}
          </div>
          <div style="margin-top: 15px; text-align: left; font-size: 13px"><span style="font-weight: 600">作者：</span>
            <span v-if="creatorType === 'teacher'" style="font-weight: 400; color: red;">{{creatorUsername}}</span>
            <span v-if="creatorType === 'student'">{{creatorUsername}}</span>
          </div>
        </el-main>
        <el-aside style="float: right; text-align: right; margin: 30px 20px 0 0;">
          <div style="font-size: 13px">
            <span>回复：{{replyCount}}</span>
          </div>
          <div style="margin-top: 10px; font-size: 10px">
            <span>最后回复：{{changeTime}}</span>
          </div>
          <el-popover placement="top-start" width="400" trigger="hover"
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
        </el-aside>
      </el-container>
    </el-card>

  </div>
</template>

<script>

  import {getUrl} from "@/api/tools/tool";

  export default {
    props: {
      "creatorType" : String,
      "creatorEmail": String,
      "id": Number,
      "creatorUsername": String,
      "creatorAvatar": String,
      "title": String,
      "replyCount": Number,
      "changeTime": String
    },
    name: "PosterItem",
    data() {
      return {
      }
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
    methods: {
      toPoster() {
        this.$router.push("/" + this.$store.getters.userType + "/forum/" + this.$route.params['id'] + "/" + this.id);
      }
    }
  }
</script>

<style scoped>

</style>
