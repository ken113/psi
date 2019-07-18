<template>
  <div>
    <div id="nav">
      <div style="overflow:hidden;">
        <div style="display: inline-block;width: 300px;float: left;height: 60px;line-height: 60px;background: #3c3b3b;color: #fff;text-align: center;">公司大LGOG</div>
        <div style="float: left;width: 1284px;">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="order">
              <router-link to="/order" style="">订单管理</router-link>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">采购业务</template>
              <el-menu-item index="material">
                <router-link to="/material" style="">材料物品管理</router-link>
              </el-menu-item>
              <el-menu-item index="2-2">供应商管理</el-menu-item>
              <el-menu-item index="2-3">采购单管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">销售业务</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">仓库业务</template>
              <el-menu-item index="4-1">选项1</el-menu-item>
              <el-menu-item index="4-2">选项2</el-menu-item>
              <el-menu-item index="4-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="5">财务管理</el-menu-item>
            <el-menu-item index="user">
              <router-link to="/user">用户管理</router-link>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "topNav",
  data() {
    return {
      activeIndex: "",
      showNav: false
    };
  },
  mounted() {
    this.activeIndex = this.$route.path.split("/")[1];
  },
  watch: {
    $route(to, from) {
      //this.activeIndex = to.path.split("/")[1];
    }
  },
  methods: {
    handleSelect(key, keyPath) {}
  }
};
</script>
<style lang="scss">
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
