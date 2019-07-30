<template>
  <div class="page-order">
    <div style="overflow:hidden;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:20px 0;float:left;">
        <el-breadcrumb-item :to="{ path: '/' }">采购单管理</el-breadcrumb-item>
      </el-breadcrumb>
      <router-link to="/purchase/add">
        <el-button type="primary" style="float:right;margin-top:8px;">新增客户</el-button>
      </router-link>
      <el-button style="float:right;margin:8px 10px 0 10px;">导出</el-button>

      <el-button type="primary" style="float:right;margin:8px 10px 0 10px;" @click="loadList()">搜索</el-button>
      <el-input style="float:right;margin:8px 10px 0 10px; width:350px;" v-model="searchStr" placeholder="订单名称搜索" />
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="purchaseNumber" label="单据编号">
      </el-table-column>
      <el-table-column prop="debt" label="应收欠款">
      </el-table-column>
      <el-table-column prop="date" label="业务日期">
      </el-table-column>
      <el-table-column prop="state" label="处理状态">
      </el-table-column>
      <el-table-column prop="reviewer" label="审核人">
      </el-table-column>
      <el-table-column prop="supplierName" label="供应商名称">
      </el-table-column>
      <el-table-column prop="goods" label="进货订单商品">
      </el-table-column>
      <el-table-column prop="goodsNum" label="数量">
      </el-table-column>
      <el-table-column prop="pay" label="应付金额(元)">
      </el-table-column>
      <el-table-column prop="opt" label="操作">
        <template scope="scope">
          <router-link :to="{path:'/purchase/edit/' + scope.row.purchaseId }">
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
      tableData: [],
      searchStr: ""
    };
  },
  mounted() {
    this.loadList();
  },
  methods: {
    loadList() {
      var that = this;
      axios
        .post("/purchase/getPurchaseList", { searchStr: that.searchStr })
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
