<template>
  <div>
    <el-card>
      <div slot="header">
        <span>{{name}}</span>
      </div>
      <span>描述：{{description}}</span>
      <span v-if="!check">未审批</span>
      <span v-if="check">审批结果：{{approve}}</span>
      <span>创建日期：{{createDate}}</span>
      <el-button type="text" class="button" v-if="approve" @click="showHistoryReleasePanel = true">历史发布</el-button>
      <el-button type="text" class="button" v-if="approve" @click="showCreateReleaseTable = true">新增发布</el-button>

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
    }
  }
</script>

<style scoped>
</style>
