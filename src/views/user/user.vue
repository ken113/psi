<template>
  <div class="page-user">
    <div style="overflow:hidden;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:20px 0;float:left;">
        <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <router-link to="/user/add">
        <el-button type="primary" style="float:right;margin-top:8px;">
          新增用户
        </el-button>
      </router-link>
      <el-button style="float:right;margin:8px 10px 0 10px;">导出</el-button>
      <el-button type="primary" style="float:right;margin:8px 10px 0 10px;" @click="loadList()"> 搜索</el-button>
      <el-input style="float:right;margin:8px 10px 0 10px; width:350px;" placeholder="姓名模糊搜索" v-model="searchStr" />
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="mobileNo" label="手机号">
      </el-table-column>
      <el-table-column prop="userName" label="姓名">
      </el-table-column>
      <el-table-column prop="department" label="部门">
      </el-table-column>
      <el-table-column prop="opt" label="操作">
        <template scope="scope">
          <router-link :to="{path:'/user/edit/' + scope.row.userId }">
            <el-button type="text">修改</el-button>
          </router-link>
          <el-button type="text" @click="deleteUser(scope.row.userId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "order",
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
        .post("/user/getUserList", { searchStr: that.searchStr })
        .then(function(response) {
          if (response.status === 200) {
            that.tableData = response.data.list;
          }
        })
        .catch(function(error) {});
    },

    deleteUser(userId) {
      const that = this;
      axios.post("/user/deleteUser/" + userId).then(function(response) {
        if (response.status === 200 && response.data.code === "0") {
          that.loadList();
        } else {
          that.$message.error(response.data.desc);
        }
      });
    }
  }
};
</script>
<style scoped>
</style>
