<template>
  <div class="page-addorder">
    <div style="overflow:hidden;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:20px 0;float:left;">
        <el-breadcrumb-item :to="{ path: '/order' }">订单列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form label-width="100px" :model="form" :rules="rules" ref="form" :inline="true">
      <el-form-item label="客户订单:" prop="customerOrderNo">
        <el-input v-model="form.customerOrderNo"></el-input>
      </el-form-item>
      <el-form-item label="订单名称:" prop="orderName">
        <el-input v-model="form.orderName"></el-input>
      </el-form-item>
      <el-form-item label="客户公司:" prop="customerCompany">
        <el-input v-model="form.customerCompany"></el-input>
      </el-form-item>
      <el-form-item label="规格:" prop="specs">
        <el-input v-model="form.specs"></el-input>
      </el-form-item>
      <el-form-item label="单价:" prop="price">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="数量:" prop="count">
        <el-input v-model="form.count"></el-input>
      </el-form-item>
      <el-form-item label="客户交期:" prop="customerDeliveryDate">
        <el-date-picker v-model="form.customerDeliveryDate" type="date" placeholder="选择日期" style="width:200px;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="对帐月份:" prop="reconciliationMonth">
        <el-date-picker v-model="form.reconciliationMonth" type="month" placeholder="选择日期" style="width:200px;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="送货日期:" prop="deliveryDate">
        <el-date-picker v-model="form.deliveryDate" type="date" placeholder="选择日期" style="width:200px;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="送货数量:" prop="deliveryCount">
        <el-input v-model="form.deliveryCount"></el-input>
      </el-form-item>
      <el-form-item label="部门代码:" prop="departmentCode">
        <el-input v-model="form.departmentCode"></el-input>
      </el-form-item>
      <el-form-item label="联系人:" prop="contacts">
        <el-input v-model="form.contacts"></el-input>
      </el-form-item>
      <el-form-item label="使用人:" prop="user">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入内容" style="width:400px;"></el-input>
      </el-form-item>
      <div style="text-align:left;">
        <el-form-item>
          <el-button type="primary" @click="addUser">立即创建</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "addOrder",
  data() {
    return {
      form: {
        customerOrderNo: "",
        orderName: "",
        customerCompany: "",
        specs: "",
        price: "",
        count: "",
        money: "",
        customerDeliveryDate: "",
        reconciliationMonth: "",
        materialName: "",
        deliveryDate: "",
        deliveryCount: "",
        deficit: "",
        departmentCode: "",
        contacts: "",
        user: "",
        remark: ""
      },
      rules: {
        materialName: [
          //{ required: true, message: "请填写物料名称", trigger: "blur" }
        ]
      }
    };
  },

  mounted() {
    var that = this;
  },
  methods: {
    addUser() {
      const that = this;

      this.$refs.form.validate(valid => {
        if (valid) {
          const userName = localStorage.getItem("userName");
          const param = Object.assign({}, that.form);
          axios.post("/order/add", param).then(function(response) {
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
