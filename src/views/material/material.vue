<template>
  <div class="page-material">
    <div style="overflow:hidden;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:20px 0;float:left;">
        <el-breadcrumb-item>采购业务</el-breadcrumb-item>
        <el-breadcrumb-item>材料物品管理</el-breadcrumb-item>
      </el-breadcrumb>
      <router-link to="/material/add">
        <el-button type="primary" style="float:right;margin-top:8px;">新增物料</el-button>
      </router-link>
      <el-button style="float:right;margin:8px 10px 0 10px;">导出</el-button>

      <el-button type="primary" style="float:right;margin:8px 10px 0 10px;">搜索</el-button>
      <el-input style="float:right;margin:8px 10px 0 10px; width:350px;" placeholder="物料编码搜索,支持多编码空格隔开搜索" />
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="materialId" label="物料编号">
      </el-table-column>
      <el-table-column prop="materialName" label="物料名称">
      </el-table-column>
      <el-table-column prop="specification" label="规格">
      </el-table-column>
      <el-table-column prop="code" label="助记码">
      </el-table-column>
      <el-table-column prop="type" label="种类">
      </el-table-column>
      <el-table-column prop="unit" label="单位">
      </el-table-column>
      <el-table-column prop="min" label="最低库存">
      </el-table-column>
      <el-table-column prop="max" label="最高库存">
      </el-table-column>
      <el-table-column prop="stockCount" label="库存数">
      </el-table-column>
      <el-table-column prop="enterPerson" label="录入人员">
      </el-table-column>
      <el-table-column prop="enterDate" label="录入时间" width='150' column-key="enterDate" :formatter="formatTime">
      </el-table-column>
      <el-table-column prop="modifyPerson" label="修改人员">
      </el-table-column>
      <el-table-column prop="modifyDate" label="修改时间" width='150' column-key="modifyDate" :formatter="formatTime">
      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
      <el-table-column prop="opt" label="操作">
        <template scope="scope">
          <router-link :to="{path:'/material/edit/' + scope.row.materialId }">
            <el-button type="text">修改</el-button>
          </router-link>
          <el-button type="text" @click="deleteMaterial(scope.row.materialId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";

import { convertDate } from "./../../lib/common";

export default {
  name: "material",
  data() {
    return {
      searchStr: "",
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
        .post("/material/getMaterialList", { searchStr: that.searchStr })
        .then(function(response) {
          if (response.status === 200) {
            that.tableData = response.data.list;
          }
        })
        .catch(function(error) {});
    },
    formatTime(row, column) {
      if (column.columnKey === "enterDate") {
        return convertDate(row.enterDate);
      }
      if (column.columnKey === "modifyDate") {
        return convertDate(row.modifyDate);
      }
    },
    deleteMaterial(materialId) {}
  }
};
</script>
<style scoped>
</style>
