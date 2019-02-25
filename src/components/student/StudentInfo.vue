<template>
  <div>
    <el-container>
      <el-aside width="170px" height="170px">
        <transition>
          <div v-if="editAvatar" style="font-size: 14px;color: white;width: 170px;height: 170px
          ;z-index: 1;position: absolute;background-color:rgba(0,0,0,0.2);text-align: center
          ;cursor: pointer;">
            <div style="padding-top: 66px;">变更</div>
            <div>头像</div>
          </div>
        </transition>
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
                <el-form-item prop="number">
                  <el-input v-model="editInfo.number"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div v-else="editBasicInfo" style="width: 380px;position: absolute;">
              <div style="font-weight: 800; font-size: 35px;">{{basicInfo.username}}</div>
              <div style="font-size: 20px;">{{basicInfo.email}}</div>
              <div style="font-size: 20px;">{{basicInfo.number}}</div>
            </div>
          </transition>
        </div>
      </el-main>
      <el-aside>
        <el-button v-if="!editBasicInfo" type="primary" style="float: right;height: 40px;width: 150px;margin-top: 10px;" @click="changeEditInfoState">编辑信息</el-button>
        <el-button v-if="editBasicInfo" type="success" style="float: right;height: 40px;width: 150px;margin-top: 10px;" @click="commitInfoChange">提交</el-button>

      </el-aside>
    </el-container>
    <student-statistics></student-statistics>
  </div>
</template>

<script>

  import {getStudentInfo, changeStudentInfo} from "@/api/student/studentInfo";
  import StudentStatistics from "@/components/student/StudentStatistics";

  export default {
    name: "StudentInfo",
    components: {
      StudentStatistics
    },
    data() {
      return {
        basicInfo: {
          email: '',
          username: '',
          number: '',
          avatar: ''
        },
        editBasicInfo: false,
        editAvatar: false,
        editInfo: {
          username: '',
          number: ''
        }
      }
    },
    methods: {
      getUserInfo() {
        getStudentInfo(this.$store.getters.token,
        res => {
          this.basicInfo.email = res.data.email;
          this.basicInfo.number = res.data.number;
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
          this.editInfo.number = this.basicInfo.number;
        }
        this.editBasicInfo = !this.editBasicInfo;
      },
      commitInfoChange() {
        changeStudentInfo(this.$store.getters.token, this.editInfo.username, this.editInfo.number,
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
