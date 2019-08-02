<template>
  <div class="page-addorder">
    <div style="overflow:hidden;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:20px 0;float:left;">
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form label-width="100px" style="width:400px;" :model="form" :rules="rules" ref="form">
      <el-form-item label="单据编号:" prop="purchaseNumber" required>
        <el-input v-model="form.customerName"></el-input>
      </el-form-item>
      <el-form-item label="应收欠款:" prop="debt" required>
        <el-input v-model="form.contacts"></el-input>
      </el-form-item>
      <el-form-item label="业务日期:" prop="date" required>
        <el-input v-model="form.contactsPhonte"></el-input>
      </el-form-item>
      <el-form-item label="供应商名称:" prop="supplierName">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="进货订单商品:" prop="goods">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="数量:" prop="goodsNum">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="应付金额:" prop="pay">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <div style="text-align:left;">
        <el-form-item>
          <el-button type="primary" @click="add">立即创建</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "addCustomer",
  data() {
    return {
      form: {
        customerName: "",
        contacts: "",
        contactsPhonte: "",
        tel: "",
        address: ""
      },
      rules: {
        materialName: [
          { required: true, message: "请填写物料名称", trigger: "blur" }
        ]
      }
    };
  },

  mounted() {
    var that = this;
  },
  methods: {
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
