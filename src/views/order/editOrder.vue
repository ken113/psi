<template>
  <div class="page-addorder">
    <div style="overflow:hidden;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:20px 0;float:left;">
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        <el-breadcrumb-item>订单修改</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form label-width="100px" style="width:400px;" :model="form" :rules="rules" ref="form">
      <el-form-item label="订单名称:" prop="orderName" required>
        <el-input v-model="form.orderName"></el-input>
      </el-form-item>
      <el-form-item label="客户公司:" prop="customerCompany" required>
        <el-input v-model="form.customerCompany"></el-input>
      </el-form-item>
      <el-form-item label="物料:" prop="materialName" required>
        <el-input v-model="form.materialName"></el-input>
      </el-form-item>
      <el-form-item label="交货日期:" prop="deliveryDate" required>
        <el-date-picker v-model="form.deliveryDate" type="date" placeholder="选择日期" style="width:300px;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入内容"></el-input>
      </el-form-item>
      <div style="text-align:left;">
        <el-form-item>
          <el-button type="primary" @click="modifyOrder">立即创建</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "modifyOrder",
  data() {
    return {
      form: {
        orderName: "",
        customerCompany: "",
        materialName: "",
        deliveryDate: "",
        remark: ""
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
    that.orderId = that.$route.params.orderId * 1;
    axios.get("/order/getOrderById/" + that.orderId).then(function(response) {
      if (response.status === 200) {
        that.form = Object.assign({}, that.from, response.data);
      } else {
        that.$message.error(response.data.desc);
      }
    });
  },
  methods: {
    modifyOrder() {
      const that = this;

      this.$refs.form.validate(valid => {
        if (valid) {
          const userName = localStorage.getItem("userName");
          const param = Object.assign({}, that.form);
          axios.post("/order/updateOrder", param).then(function(response) {
            if (response.status === 200 && response.data.code === "0") {
              window.location.href = "/order";
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
