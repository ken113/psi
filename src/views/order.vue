<template>
  <div class="page-order">
    <div style="overflow:hidden;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:20px 0;float:left;">
        <el-breadcrumb-item :to="{ path: '/' }">订单管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary" style="float:right;margin-top:8px;">新增订单</el-button>
      <el-button style="float:right;margin:8px 10px 0 10px;">导出</el-button>

      <el-button type="primary" style="float:right;margin:8px 10px 0 10px;">搜索</el-button>
      <el-input style="float:right;margin:8px 10px 0 10px; width:350px;" placeholder="订单编号搜索,支持多编号空格隔开搜索" />
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="number" label="订单号">
      </el-table-column>
      <el-table-column prop="name" label="订单名称">
      </el-table-column>
      <el-table-column prop="cus" label="客户公司">
      </el-table-column>
      <el-table-column prop="state" label="订单状态">
      </el-table-column>
      <el-table-column prop="date" label="下单日期">
      </el-table-column>
      <el-table-column prop="date2" label="交货日期">
      </el-table-column>
      <el-table-column prop="mac" label="机器运转数">
      </el-table-column>
      <el-table-column prop="mat" label="物料">
      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "order",
  data() {
    return {
      tableData: [
        {
          number: "201906100001",
          name: "华为5G设备",
          cus: "华为公司",
          state: "生产中",
          date: "2019-06-21 08:12:19",
          date2: "2019-09-21 08:12:19",
          mac: "10",
          mat: "物料A",
          remark: "！"
        },
        {
          number: "201906100001",
          name: "投影仪设备",
          cus: "IBM",
          state: "发货中",
          date: "2019-06-21 08:12:19",
          date2: "2019-09-21 08:12:19",
          mac: "8",
          mat: "物料B",
          remark: "快递被偷了！"
        }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
</style>
