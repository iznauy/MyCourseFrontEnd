<template>
  <div v-if="!hasProcessed">
    <div @click="showDetail">
      <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 10px;margin-top: 10px; cursor: pointer;">
        <el-container>
          <el-main style="background-color: transparent;">
            <div style="font-weight: 800;font-size: 15px; margin-bottom: 10px" class="center">{{name}}</div>
            <div style="text-align: left; font-size: 10px; margin-bottom: 10px">创建日期：{{createDate}}</div>
            <div style="text-align: left; font-size: 10px; margin-bottom: 10px">创建者：<span style="color: red;">{{creatorEmail}}</span></div>
          </el-main>
          <el-aside>
            <div style="color: #717478;font-size: 13px; text-align: left;  margin-top: 30px"><span style="font-weight: 700">详细描述：</span>{{abstractDescription}}</div>
          </el-aside>
        </el-container>
      </el-card>
    </div>

    <el-dialog :visible.sync="displayDetail" title="详细信息" width="40%">
      <el-form style="width: 80%; margin: 0 auto;">
        <el-form-item label-width="60px" label="名称">
          <el-input type="text" :disabled="true" v-model="name"></el-input>
        </el-form-item>
        <el-form-item label-width="60px" label="说明">
          <el-input type="textarea" :disabled="true" v-model="description"></el-input>
        </el-form-item>
        <el-form-item label-width="60px" label="创建人">
          <el-input type="text" :disabled="true" v-model="creatorEmail"></el-input>
        </el-form-item>
        <el-form-item label-width="60px" label="时间">
          <el-input type="text" :disabled="true" v-model="createDate"></el-input>
        </el-form-item>
        <el-form-item label-width="0" style="margin-top: 15px">
          <el-button type="primary" @click="disApprove" size="small">拒绝</el-button>
          <el-button type="success" @click="approve" size="small">批准</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

  import {checkCourse} from "@/api/administrator/adminCourse";

  export default {
    props: {
      "name": String,
      "id": Number,
      "description": String,
      "createDate": String,
      "creatorEmail": String
    },
    name: "AdminCourseItem",
    data() {
      return {
        hasProcessed: false,
        displayDetail: false
      }
    },
    methods: {
      vanish() {
        this.hasProcessed = true;
      },
      approve() {
        checkCourse(this.$store.getters.token, this.id, true,
        res => {
          this.$message({
            message: "审批成功!",
            type: 'success'
          });
          this.vanish()
        },
        err => {
          this.$message.error("审批失败：" + err.response.data.message);
        });
      },
      disApprove() {
        checkCourse(this.$store.getters.token, this.id, false,
          res => {
            this.$message({
              message: "审批成功!",
              type: 'success'
            });
            this.vanish()
          },
          err => {
            this.$message.error("审批失败：" + err.response.data.message);
          });
      },
      showDetail() {
        this.displayDetail = true;
        console.log("show detail!")
      },
      vanishDetail() {
        this.displayDetail = false;
      }
    },
    computed: {
      abstractDescription() {
        if (this.description.length < 200)
          return this.description;
        else
          return this.description.substr(0, 200) + "...";
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
