<template>
  <div class="page-login">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="50px" class="demo-ruleForm">
      <el-form-item label="手机:" prop="mobilePhone">
        <el-input v-model.number="ruleForm.mobileNo"></el-input>
      </el-form-item>

      <el-form-item label="密码:" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        mobileNo: "",
        password: ""
      }
    };
  },
  mounted() {},
  methods: {
    submitForm() {
      var that = this;
      axios
        .post("/user/login", that.ruleForm)
        .then(function(response) {
          if (response.status === 200) {
            if (response.data.code === "-1") {
              that.$alert(response.data.desc, "登录提示", {
                confirmButtonText: "确定",
                callback: action => {}
              });
            } else {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("userName", response.data.userInfo.userName);
              let path = that.$route.query.redirect;
              if (path) {
                window.location.href = path;
              } else {
                window.location.href = "/";
              }
            }
          }
        })
        .catch(function(error) {});
    }
  }
};
</script>
<style scoped>
.page-login {
  width: 400px;
  margin: 100px auto;
  border: 1px solid #dddddd;
  padding: 20px;
}
</style>
