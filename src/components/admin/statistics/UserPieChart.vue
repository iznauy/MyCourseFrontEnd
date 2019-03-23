<template>
  <div>
    <pie-chart :name="names" :data="values" :unique-id="1" title="用户数量"></pie-chart>
  </div>
</template>

<script>

  import PieChart from "@/components/admin/statistics/PieChart";
  import {loadUsers} from "@/api/administrator/adminStatistics";

  export default {
    name: "UserPieChart",
    components: {
      PieChart
    },
    data() {
      return {
        names: [],
        values: []
      }
    },
    methods: {
      getData() {
        loadUsers(this.$store.getters.token, res => {
          let data = res.data;
          this.names.push("学生");
          this.names.push("老师");
          this.values.push(data['students']);
          this.values.push(data['teachers']);
        })
      }
    },
    created() {
      this.getData();
    }
  }
</script>

<style scoped>

</style>
