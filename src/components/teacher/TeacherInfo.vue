<template>
  <div>
    <div class="info" style="background-color: #8cd6b4;">
      <el-container>
        <el-aside style="overflow: visible; margin-left: 15px" width="160px">
          <div style="vertical-align: top;background-color: #FFFFFF;border: 4px solid #FFFFFF; border-radius: 8px;top: -15px;position: relative;  height: 160px; width: 160px">
            <img alt="avatar" :src="basicInfo.avatar" width="160px" height="160px" style="border-radius: 4px;">
          </div>
        </el-aside>
        <el-main>
          <div>
            <div v-if="editBasicInfo" style="font-weight: 800; font-size: 35px;">
            <el-form :model="editInfo" ref="userInfo">
              <el-form-item prop="userName" label-width="60px" label="用户名">
                <el-input v-model="editInfo.username" size="medium"></el-input>
              </el-form-item>
            </el-form>
            </div>
            <div v-else="editBasicInfo">
              <div style="font-weight: 800; font-size: 35px;" class="center">{{basicInfo.username}}</div>
              <div style="font-size: 15px; text-align: left; margin-top: 60px;">邮箱：{{basicInfo.email}}</div>
            </div>
          </div>
        </el-main>
        <el-aside>
          <el-button v-if="!editBasicInfo" type="primary" style="float: right;margin-top: 120px; margin-right: 20px" @click="changeEditInfoState" size="small">编辑信息</el-button>
          <el-button v-if="editBasicInfo" type="success" style="float: right;margin-top: 120px; margin-right: 20px" @click="commitInfoChange" size="small">提交</el-button>
        </el-aside>
      </el-container>
    </div>
  </div>
</template>


<script>
  import {getTeacherInfo, modifyTeacherInfo} from "@/api/teacher/teacherInfo";

  export default {
    name: "TeacherInfo",
    data() {
      return {
        basicInfo: {
          username: "",
          email: "",
          avatar: ""
        },
        editInfo: {
          username: ""
        },
        editBasicInfo: false
      }
    },
    methods: {
      getUserInfo() {
        getTeacherInfo(this.$store.getters.token,
          res => {
            this.basicInfo.email = res.data.email;
            this.basicInfo.username = res.data.username;
            this.basicInfo.avatar = res.data.avatar;

            this.$store.dispatch("updateAvatar", res.data.avatar)
          },
          error => {
            console.log(error.response)
          })
      },
      changeEditInfoState() {
        if (!this.editBasicInfo) {
          this.editInfo.username = this.basicInfo.username;
        }
        this.editBasicInfo = !this.editBasicInfo;
      },
      commitInfoChange() {
        modifyTeacherInfo(this.$store.getters.token, this.editInfo.username,
          () => {
            this.changeEditInfoState();
            this.getUserInfo()
          },
          error => {
            this.$message.error("变更信息失败：" + error.response.data.message);
          }
        );

      }
    },
    created: function () {
      this.getUserInfo();
    },
    watch: {
      '$router': 'getUserInfo'
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
