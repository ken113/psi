<template>
  <div class="page-material">
    <div style="overflow:hidden;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:20px 0;float:left;">
        <el-breadcrumb-item>采购业务</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/material' }">材料物料管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增物料</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form label-width="100px" style="width:400px;" :model="form" :rules="rules" ref="form">
      <el-form-item label="物料名称:" prop="materialName" required>
        <el-input v-model="form.materialName"></el-input>
      </el-form-item>
      <el-form-item label="助记码:" prop="code" required>
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="规格:" prop="specification" required>
        <el-input v-model="form.specification"></el-input>
      </el-form-item>
      <el-form-item label="种类:" prop="type" required>
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="单位:" prop="unit" required>
        <el-input v-model="form.unit"></el-input>
      </el-form-item>
      <el-form-item label="最低库存:" prop="min" required>
        <el-input v-model.number="form.min"></el-input>
      </el-form-item>
      <el-form-item label="最高库存:" prop="max" required>
        <el-input v-model.number="form.max"></el-input>
      </el-form-item>
      <el-form-item label="库存数:" prop="stockCount" required>
        <el-input v-model.number="form.stockCount"></el-input>
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入内容"></el-input>
      </el-form-item>
      <div style="text-align:left;">
        <el-form-item>
          <el-button type="primary" @click="addMat">立即创建</el-button>
        </el-form-item>
      </div>

    </el-form>

  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "addUser",
  data() {
    return {
      form: {
        materialName: "",
        code: "",
        specification: "",
        type: "",
        unit: "",
        min: "",
        max: "",
        stockCount: "",
        remark: ""
      },
      rules: {
        materialName: [
          { required: true, message: "请填写物料名称", trigger: "blur" }
        ],
        code: [{ required: true, message: "请填写助记码", trigger: "blur" }]
      }
    };
  },

  mounted() {
    var that = this;
  },
  methods: {
    addMat() {
      const that = this;

      this.$refs.form.validate(valid => {
        if (valid) {
          const userName = localStorage.getItem("userName");
          const param = Object.assign({}, that.form, {
            userName
          });
          axios.post("/material/add", param).then(function(response) {
            if (response.status === 200 && response.data.code === "0") {
              window.location.href = "/material";
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
