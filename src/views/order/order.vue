<template>
  <div class="page-order">
    <div style="overflow:hidden;margin:15px 0;">

      <router-link to="/order/add">
        <el-button type="primary" style="float:right;margin-top:8px;">新增订单</el-button>
      </router-link>
      <el-button style="float:right;margin:8px 10px 0 10px;" @click="downloadExl">导出</el-button>
      <el-button style="float:right;margin:8px 10px 0 10px;" @click="importExl">导入</el-button>
      <input type="file" @change="importFile(this)" id="imFile" style="display: none" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
      <el-button type="primary" style="float:right;margin:8px 10px 0 10px;">搜索</el-button>
      <el-input style="float:right;margin:8px 10px 0 10px; width:350px;" placeholder="订单编号搜索,支持多编号空格隔开搜索" />
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="orderNumber" label="订单号">
        </el-table-column>
        <el-table-column prop="orderName" label="订单名称">
        </el-table-column>
        <el-table-column prop="customerCompany" label="客户公司">
        </el-table-column>
        <el-table-column prop="state" label="订单状态" column-key="state" :formatter="formatState">
        </el-table-column>
        <el-table-column prop="createDate" label="下单时间" column-key="createDate" :formatter="formatTime">
        </el-table-column>
        <el-table-column prop="deliveryDate" label="交货日期" column-key="deliveryDate" :formatter="formatTime">
        </el-table-column>
        <el-table-column prop="materialName" label="物料">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <el-table-column prop="opt" label="操作">
          <template scope="scope">
            <router-link :to="{path:'/order/edit/' + scope.row.orderId }">
              <el-button type="text">修改</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 50, 100, 200]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import XLSX from "xlsx";
import {
  convertDate,
  downloadExcel,
  importConverData
} from "./../../lib/common";
export default {
  name: "order",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: 0
    };
  },
  mounted() {
    this.loadList();
  },
  methods: {
    loadList() {
      var that = this;
      axios
        .post("/order/getOrderList", { searchStr: that.searchStr })
        .then(function(response) {
          if (response.status === 200) {
            that.tableData = response.data.list;
            that.total = response.data.list.length;
          }
        })
        .catch(function(error) {});
    },
    formatTime(row, column) {
      if (column.columnKey === "createDate") {
        return convertDate(row.createDate);
      }
      if (column.columnKey === "deliveryDate") {
        return convertDate(row.deliveryDate).substring(0, 10);
      }
    },
    formatState(row, column) {
      let html = "";
      if (row.state === "接单") {
        html = <span style="color:#FF0000">接单</span>;
      } else {
        html = row.state;
      }
      return <div>{html}</div>;
    },
    downloadExl() {
      let excelData = [
        {
          orderNumber: "订单号",
          orderName: "订单名称",
          customerCompany: "客户公司",
          state: "订单状态",
          createDate: "下单时间",
          deliveryDate: "交货日期",
          materialName: "物料",
          remark: "备注"
        }
      ];

      this.tableData.forEach((item, key) => {
        item.createDate = convertDate(item.createDate);
        item.deliveryDate = convertDate(item.deliveryDate).substring(0, 10);
        excelData.push(item);
      });

      downloadExcel(excelData, "order");
    },
    importExl() {
      document.getElementById("imFile").click();
    },
    importFile() {
      importConverData(data => {
        // 处理导入的数据
        let that = this;
        let importData = [];
        data.forEach(item => {
          importData.push({
            orderNumber: item["订单号"],
            orderName: item["订单名称"],
            customerCompany: item["客户公司"],
            state: item["订单状态"],
            createDate: item["下单时间"],
            deliveryDate: item["交货日期"],
            materialName: item["物料"],
            remark: item["备注"]
          });
        });

        axios.post("/order/import", importData).then(function(response) {
          if (response.status === 200 && response.data.code === "0") {
            that.loadList();
          } else {
            that.$message.error(response.data.desc);
          }
        });
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style scoped>
</style>
