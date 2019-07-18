<template>

  <div class="page-material">
    <div style="overflow:hidden;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:20px 0;float:left;">
        <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-form label-width="80px" style="width:400px;" :model="form" :rules="rules" ref="form">
      <el-form-item label="姓名：" prop="userName" required>
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" prop="mobileNo" required>
        <el-input v-model.number="form.mobileNo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addUser">立即创建</el-button>
      </el-form-item>
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
        userName: "",
        modileNo: ""
      },
      rules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        mobileNo: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            type: "number",
            message: "手机号必须为数字",
            trigger: ["blur", "change"]
          }
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
          const param = {
            mobileNo: that.form.mobileNo,
            userName: that.form.userName,
            password: "123456"
          };
          axios.post("/user/regist", param).then(function(response) {
            if (response.status === 200 && response.data.code === 0) {
              window.location.href = "/user";
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
