<template>
  <div class="page-order">
    <div style="overflow:hidden;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:20px 0;float:left;">
        <el-breadcrumb-item :to="{ path: '/' }">订单管理</el-breadcrumb-item>
      </el-breadcrumb>
      <router-link to="/order/add">
        <el-button type="primary" style="float:right;margin-top:8px;">新增订单</el-button>
      </router-link>
      <el-button style="float:right;margin:8px 10px 0 10px;">导出</el-button>

      <el-button type="primary" style="float:right;margin:8px 10px 0 10px;">搜索</el-button>
      <el-input style="float:right;margin:8px 10px 0 10px; width:350px;" placeholder="订单编号搜索,支持多编号空格隔开搜索" />
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="orderNumber" label="订单号">
      </el-table-column>
      <el-table-column prop="orderName" label="订单名称">
      </el-table-column>
      <el-table-column prop="customerCompany" label="客户公司">
      </el-table-column>
      <el-table-column prop="state" label="订单状态" column-key="state" :formatter="formatState">
      </el-table-column>
      <el-table-column prop="createDate" label="下单时间" column-key="createDate" :formatter="formatTime">
      </el-table-column>
      <el-table-column prop="deliveryDate" label="交货日期" column-key="deliveryDate" :formatter="formatTime">
      </el-table-column>
      <el-table-column prop="materialName" label="物料">
      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
      <el-table-column prop="opt" label="操作">
        <template scope="scope">
          <router-link :to="{path:'/order/edit/' + scope.row.orderId }">
            <el-button type="text">修改</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
import { convertDate } from "./../../lib/common";
export default {
  name: "order",
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.loadList();
  },
  methods: {
    loadList() {
      var that = this;
      axios
        .post("/order/getOrderList", { searchStr: that.searchStr })
        .then(function(response) {
          if (response.status === 200) {
            that.tableData = response.data.list;
          }
        })
        .catch(function(error) {});
    },
    formatTime(row, column) {
      if (column.columnKey === "createDate") {
        return convertDate(row.createDate);
      }
      if (column.columnKey === "deliveryDate") {
        return convertDate(row.deliveryDate).substring(0, 10);
      }
    },
    formatState(row, column) {
      let html = "";
      if (row.state === "接单") {
        html = <span style="color:#FF0000">接单</span>;
      }
      return <div>{html}</div>;
    }
  }
};
</script>
<style scoped>
</style>
