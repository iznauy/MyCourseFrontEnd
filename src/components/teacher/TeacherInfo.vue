<template>
  <div>
    <el-container>
      <el-aside width="170px" height="170px">
        <img :src="basicInfo.avatar" width="170px" height="170px">
      </el-aside>
      <el-main>
        <div style="position: absolute;">
          <transition name="fade">

            <div v-if="editBasicInfo" style="width: 250px;position: absolute;">
              <el-form :model="editInfo" ref="userInfo" label-width="0px" size="mini">
                <el-form-item prop="userName">
                  <el-input v-model="editInfo.username"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div v-else="editBasicInfo" style="width: 380px;position: absolute;">
              <div style="font-weight: 800; font-size: 35px;">{{basicInfo.username}}</div>
              <div style="font-size: 20px;">{{basicInfo.email}}</div>
            </div>
          </transition>
        </div>
      </el-main>
      <el-aside>
        <el-button v-if="!editBasicInfo" type="primary" style="float: right;height: 40px;width: 150px;margin-top: 10px;" @click="changeEditInfoState">编辑信息</el-button>
        <el-button v-if="editBasicInfo" type="success" style="float: right;height: 40px;width: 150px;margin-top: 10px;" @click="commitInfoChange">提交</el-button>

      </el-aside>
    </el-container>
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
            this.$router.go(0)
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

</style>
