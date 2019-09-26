<template>
  <div class="page-addorder">
    <div style="overflow:hidden;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:20px 0;float:left;">
        <el-breadcrumb-item :to="{ path: '/customer' }">客户列表</el-breadcrumb-item>
        <el-breadcrumb-item>{{ pageType }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form label-width="100px" style="width:400px;" :model="form" :rules="rules" ref="form">
      <el-form-item label="客户名称:" prop="customerName" required>
        <el-input v-model="form.customerName"></el-input>
      </el-form-item>
      <el-form-item label="联系人:" prop="contacts" required>
        <el-input v-model="form.contacts"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:" prop="contactsPhonte" required>
        <el-input v-model="form.contactsPhonte"></el-input>
      </el-form-item>
      <el-form-item label="公司电话:" prop="tel">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="地址:" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <div style="text-align:left;">
        <el-form-item>
          <el-button type="primary" @click="modify" v-show="pageType=='修改客户'">修改</el-button>
          <el-button type="primary" @click="add" v-show="pageType=='新增客户'">创建</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "modifyCustomer",
  data() {
    return {
      pageType: "",
      form: {
        customerName: "",
        contacts: "",
        contactsPhonte: "",
        tel: "",
        address: ""
      },
      rules: {}
    };
  },

  mounted() {
    if (this.$route.params.customerId) {
      this.pageType = "修改客户";
      this.customerId = this.$route.params.customerId * 1;
    } else if (this.$route.params.viewId) {
      this.pageType = "查看客户详情";
      this.customerId = this.$route.params.viewId * 1;
      this.getCustomer();
    } else {
      this.pageType = "新增客户";
    }
  },
  methods: {
    getCustomer() {
      var that = this;
      axios
        .get("/customer/getCustomerById/" + that.customerId)
        .then(function(response) {
          if (response.status === 200) {
            that.form = Object.assign({}, that.from, response.data);
          } else {
            that.$message.error(response.data.desc);
          }
        });
    },

    modify() {
      const that = this;

      this.$refs.form.validate(valid => {
        if (valid) {
          const param = Object.assign({}, that.form);
          axios
            .post("/customer/updateCustomer", param)
            .then(function(response) {
              if (response.status === 200 && response.data.code === "0") {
                window.location.href = "/customer";
              } else {
                that.$message.error(response.data.desc);
              }
            });
        } else {
          return false;
        }
      });
    },
    add() {
      const that = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          const param = Object.assign({}, that.form);
          axios.post("/customer/add", param).then(function(response) {
            if (response.status === 200 && response.data.code === "0") {
              window.location.href = "/customer";
            } else {
              that.$message.error(response.data.desc);
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
</style>
