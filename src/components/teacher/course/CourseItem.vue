<template>
  <div>
    <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 10px;margin-top: 10px; cursor: pointer;">
      <el-container>
        <el-main style="background-color: transparent;">
          <div style="font-weight: 800;font-size: 15px; margin-bottom: 10px" class="center">{{name}}</div>
          <div style="color: #717478;font-size: 13px; text-align: left; margin-bottom: 10px">{{abstractDescription}}</div>
          <div style="text-align: left; font-size: 10px; margin-bottom: 10px">创建日期：{{createDate}}
          </div>
          <div style="font-size: 8px; text-align: left;">
            <span v-if="!check" id="unChecked">未审批</span>
            <span v-if="check && approve" id="approved">已通过</span>
            <span v-if="check && !approve" id="rejected">未通过</span>
          </div>
        </el-main>
        <el-aside style=" float: right;">
          <div style="margin: 25px">
            <el-button type="primary" class="button" v-if="approve" @click="showHistoryReleasePanel = true" size="small">历史发布</el-button>
          </div>
          <div style="margin: 10px">
            <el-button type="primary" class="button" v-if="approve" @click="showCreateReleaseTable = true" size="small">新增发布</el-button>
          </div>
        </el-aside>
     </el-container>
    </el-card>
    <history-release-panel v-if="showHistoryReleasePanel" @close="showHistoryReleasePanel = false" :course-id="id"></history-release-panel>
    <release-create-table v-if="showCreateReleaseTable" @close="showCreateReleaseTable = false" :course-id="id"></release-create-table>
  </div>

</template>

<script>

  import HistoryReleasePanel from './HistoryReleasePanel'
  import ReleaseCreateTable from './ReleaseCreateTable'

  export default {
    name: 'TeacherCourseItem',
    props: {
      "name": String,
      "id": Number,
      "description": String,
      "approve": Boolean,
      "check": Boolean,
      "createDate": String
    },
    data() {
      return {
        showHistoryReleasePanel: false,
        showCreateReleaseTable: false
      }
    },
    methods: {

    },
    components: {
      HistoryReleasePanel, ReleaseCreateTable
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
  #unChecked {
    font-size: 8px;
    color: #9F9F5F;
  }
  #rejected {
    font-size: 8px;
    color: red;
  }
  #approved {
    font-size: 8px;
    color: green;
  }
</style>
