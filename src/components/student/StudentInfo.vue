<template>
  <div>
    <div class="info" style="background-color: #8cd6b4;">
      <el-container>
        <el-aside style="overflow: visible; margin-left: 15px" width="160px">
          <div style="vertical-align: top;background-color: #FFFFFF;border: 4px solid #FFFFFF; border-radius: 8px;top: -15px;position: relative;  height: 160px; width: 160px">
            <transition name="fade">
              <div v-if="editAvatar" @click="displayUpload = true" style="font-size: 15px; color: white; width: 160px; height: 160px; z-index: 1;
              position: absolute;background-color:rgba(0,0,0,0.2);text-align: center;cursor: pointer;">
                <div style="padding-top: 70px">修改我的头像</div>
              </div>
            </transition>
            <img alt="avatar" :src="avatar" width="160px" height="160px" style="border-radius: 4px;">
          </div>
        </el-aside>
        <el-main>
          <div>
            <div v-if="editBasicInfo" style="font-weight: 800; font-size: 35px;">
              <el-form :model="editInfo" ref="userInfo" label-position="left">
                <el-form-item prop="userName" label-width="60px" label="用户名">
                  <el-input v-model="editInfo.username" size="medium"></el-input>
                </el-form-item>
                <el-form-item label-width="60px" label="学号">
                  <el-input v-model="editInfo.number" size="medium"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div v-else="editBasicInfo">
              <div style="font-weight: 800; font-size: 35px;" class="center">{{basicInfo.username}}</div>

              <div style="font-size: 15px; text-align: left; margin-top: 35px">学号：{{basicInfo.number}}</div>
              <div style="font-size: 15px; text-align: left; margin-top: 10px;">邮箱：{{basicInfo.email}}</div>
            </div>
          </div>
        </el-main>
        <el-aside>
          <el-button v-if="!editBasicInfo" type="primary" style="float: right;margin-top: 120px; margin-right: 20px" @click="changeEditInfoState" size="small">编辑信息</el-button>
          <el-button v-if="editBasicInfo" type="success" style="float: right;margin-top: 120px; margin-right: 20px" @click="commitInfoChange" size="small">提交</el-button>
        </el-aside>
      </el-container>
    </div>
    <el-dialog title="上传头像" :visible.sync="displayUpload" width="30%" center>
      <el-upload ref="upload" action="string" :auto-upload="false" :on-change="onChange" :limit="1" :http-request="upload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="displayUpload = false">取 消</el-button>
        <el-button type="primary" @click="handleUpload">确 定</el-button>
      </span>
    </el-dialog>

    <course-select-record></course-select-record>

  </div>
</template>

<script>

  import {getStudentInfo, changeStudentInfo, uploadAvatar} from "@/api/student/studentInfo";
  import StudentStatistics from "@/components/student/StudentStatistics";
  import {getUrl} from "@/api/tools/tool";
  import CourseSelectRecord from "@/components/student/statistics/CourseSelectRecords";

  export default {
    name: "StudentInfo",
    components: {
      CourseSelectRecord,
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
        displayUpload: false,
        editInfo: {
          username: '',
          number: ''
        },
        imageUrl: ""
      }
    },
    computed: {
      avatar() {
        return getUrl(this.basicInfo.avatar);
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
        this.editAvatar = !this.editAvatar;
      },
      commitInfoChange() {
        changeStudentInfo(this.$store.getters.token, this.editInfo.username, this.editInfo.number,
          () => {
            this.changeEditInfoState();
            this.getUserInfo();
          },
          error => {
            this.$message.error("变更信息失败：" + error.response.data.message)
          }
        );
      },
      onChange(file) {
        console.log(file);
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      upload(item) {
        uploadAvatar(this.$store.getters.token, item.file,
        res => {
          this.$message.success("头像上传成功!");
          this.displayUpload = false;
          this.getUserInfo();
        },
        err => {
          this.$message.error("头像上传失败!");
          this.displayUpload = false;
        })
      },
      handleUpload() {
        this.$refs.upload.submit();
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
  .fade-enter-active, .fade-leave-active {
    transition: all 400ms;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .fade-enter {
    transform: translateY(-170px);
  }
  .fade-leave-active {
    transform: translateY(-170px);
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
