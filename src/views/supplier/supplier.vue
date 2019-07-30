<template>
  <div class="page-order">
    <div style="overflow:hidden;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:20px 0;float:left;">
        <el-breadcrumb-item :to="{ path: '/' }">供应商管理</el-breadcrumb-item>
      </el-breadcrumb>
      <router-link to="/supplier/add">
        <el-button type="primary" style="float:right;margin-top:8px;">新增供应商</el-button>
      </router-link>
      <el-button style="float:right;margin:8px 10px 0 10px;">导出</el-button>

      <el-button type="primary" style="float:right;margin:8px 10px 0 10px;" @click="loadList()">搜索</el-button>
      <el-input style="float:right;margin:8px 10px 0 10px; width:350px;" v-model="searchStr" placeholder="订单名称搜索" />
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="supplierName" label="供应商名称">
      </el-table-column>
      <el-table-column prop="debt" label="应付欠款">
      </el-table-column>
      <el-table-column prop="tel" label="单位电话">
      </el-table-column>
      <el-table-column prop="contacts" label="联系人">
      </el-table-column>
      <el-table-column prop="contactsPhonte" label="联系人电话">
      </el-table-column>
      <el-table-column prop="address" label="联系地址">
      </el-table-column>
      <el-table-column prop="state" label="状态">
      </el-table-column>
      <el-table-column prop="opt" label="操作">
        <template scope="scope">
          <router-link :to="{path:'/supplier/edit/' + scope.row.supplierId }">
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
        .post("/supplier/getSupplierList", { searchStr: that.searchStr })
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
