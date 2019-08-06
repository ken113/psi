<template>

  <div class="page-material">
    <div style="overflow:hidden;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:20px 0;float:left;">
        <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>修改用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form label-width="80px" style="width:400px;" :model="form" :rules="rules" ref="form">
      <el-form-item label="姓名：" prop="userName" required>
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" prop="mobileNo" required>
        <el-input v-model.number="form.mobileNo"></el-input>
      </el-form-item>
      <el-form-item label="部门:" prop="department" required>
        <el-select v-model="form.department" placeholder="请选择" style="width:320px;">
          <el-option label="管理员" value="管理员"></el-option>
          <el-option label="财务" value="财务"></el-option>
          <el-option label="生产" value="生产"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="modifyUser">修改</el-button>
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
      userId: "",
      form: {
        userName: "",
        modileNo: "",
        department: ""
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
        ],
        department: [
          { required: true, message: "请选择部门", trigger: "blur,change" }
        ]
      }
    };
  },

  mounted() {
    var that = this;
    that.userId = that.$route.params.userId * 1;
    axios.get("/user/getUserById/" + that.userId).then(function(response) {
      if (response.status === 200) {
        that.form = Object.assign({}, that.from, response.data);
      } else {
        that.$message.error(response.data.desc);
      }
    });
  },
  methods: {
    modifyUser() {
      const that = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          const param = {
            mobileNo: that.form.mobileNo,
            userName: that.form.userName,
            department: that.form.department,
            userId: that.userId
          };
          axios.post("/user/updateUser", param).then(function(response) {
            if (response.status === 200 && response.data.code === "0") {
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
