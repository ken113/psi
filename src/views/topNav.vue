<template>
  <div>
    <div id="nav">
      <div class="nav-left"><i class="el-icon-platform-eleme"></i></div>
      <div class="nav-center" style="">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="2">
            <template slot="title">采购业务</template>
            <el-menu-item index="material">
              <router-link to="/material">材料物品管理</router-link>
            </el-menu-item>
            <el-menu-item index="supplier">
              <router-link to="/supplier">供应商管理</router-link>
            </el-menu-item>
            <el-menu-item index="purchase">
              <router-link to="/purchase">采购单管理</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">销售业务</template>
            <el-menu-item index="3-1">产品物料管理</el-menu-item>
            <el-menu-item index="customer">
              <router-link to="/customer">客户资料管理</router-link>
            </el-menu-item>
            <el-menu-item index="3-3">客户报价单管理</el-menu-item>
            <el-menu-item index="order">
              <router-link to="/order">销售订单管理</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">仓库业务</template>
            <el-menu-item index="4-1">采购入库</el-menu-item>
            <el-menu-item index="4-2">领料出库</el-menu-item>
            <el-menu-item index="4-3">领用还回</el-menu-item>
            <el-menu-item index="4-4">采购退货</el-menu-item>
            <el-menu-item index="4-5">期初结存</el-menu-item>
            <el-menu-item index="4-6">销售退货</el-menu-item>
            <el-menu-item index="4-7">生产入库</el-menu-item>
            <el-menu-item index="4-8">送货单管理</el-menu-item>
            <el-menu-item index="4-9">仓库库存调拨</el-menu-item>
            <el-menu-item index="4-10">仓库库存盘点</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">财务管理</template>
            <el-menu-item index="5-1">账务管理</el-menu-item>
            <el-menu-item index="5-2">费用明细</el-menu-item>
          </el-submenu>
          <el-menu-item index="user">
            <router-link to="/user">用户管理</router-link>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="nav-right">
        <span class="userName" title="修改密码" @click="updatePassword">{{ userName }}</span>
        <i class="el-icon-switch-button" title="退出登录" @click="logout"></i>
      </div>
    </div>
    <router-view></router-view>
    <a href="" download="导出.xlsx" id="hf"></a>
  </div>
</template>
<script>
import router from "./../router";
import axios from "axios";
export default {
  name: "topNav",
  data() {
    return {
      activeIndex: "",
      showNav: false,
      userName: ""
    };
  },
  mounted() {
    this.activeIndex = this.$route.path.split("/")[1];
    this.userName = localStorage.getItem("userName");

    const userInfo = {
      userName: localStorage.getItem("userName"),
      userId: 0
    };
  },
  watch: {
    $route(to, from) {
      //this.activeIndex = to.path.split("/")[1];
    }
  },
  methods: {
    handleSelect(key, keyPath) {},
    logout() {
      localStorage.removeItem("token");
      router.replace({
        path: "/login",
        query: {
          redirect: router.currentRoute.fullPath
        }
      });
    },
    updatePassword() {
      const that = this;

      this.$prompt("请输入密码", "提示", {
        confirmButtonText: "确定",
        inputType: "password",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        axios
          .post("/user/updateUser", { password: value })
          .then(function(response) {
            if (response.status === 200 && response.data.code === "0") {
              that.logout();
            } else {
              that.$message.error("修改失败");
            }
          });
      });
    }
  }
};
</script>
<style lang="scss">
#nav {
  background-color: rgb(84, 92, 100);
  overflow: hidden;
  height: 60px;
  .nav-left {
    width: 300px;
    float: left;
    height: 60px;
    line-height: 60px;
    background: #3c3b3b;
    color: #fff;
    text-align: center;

    i {
      font-size: 30px;
      margin-top: 16px;
      color: #3a8ee6;
    }
  }
  .nav-center {
    float: left;
    width: 1000px;
  }
  .nav-right {
    float: right;
    line-height: 60px;
    height: 60px;
    vertical-align: middle;

    .userName {
      font-size: 14px;
      color: #fff;
      padding: 0 10px;
      vertical-align: middle;
      cursor: pointer;
    }
    i {
      color: #fff;
      font-size: 20px;
      margin-right: 20px;
      cursor: pointer;
      vertical-align: middle;
    }
  }
}
.el-menu-item {
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    color: #fff;
    text-decoration: none;
  }
}
.el-button {
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    color: #fff;
    text-decoration: none;
  }
}
</style>
