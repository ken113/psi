<template>
  <div class="page-order">
    <div style="overflow:hidden;margin:15px 0;">
      <div style="float:left;width:400px;">
        状态更新：
        <el-select v-model="orderStatus" placeholder="请选择">
          <el-option label="已送货待签回单" value="已送货待签回单"></el-option>
          <el-option label="已外发待回料" value="已外发待回料"></el-option>
        </el-select>
      </div>
      <router-link to="/order/add">
        <el-button type="primary" style="float:right;margin-top:8px;">新增订单</el-button>
      </router-link>
      <el-button style="float:right;margin:8px 10px 0 10px;" @click="downloadExl">导出</el-button>
      <el-button style="float:right;margin:8px 10px 0 10px;" @click="importExl">导入</el-button>
      <input type="file" @change="importFile(this)" id="imFile" style="display: none" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
      <el-button type="primary" style="float:right;margin:8px 10px 0 10px;" @click="loadList()">搜索</el-button>
      <el-input style="float:right;margin:8px 10px 0 10px; width:350px;" v-model="searchStr" placeholder="订单名称搜索" />
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%" border max-height="600">
        <el-table-column type="selection" width="30">
        </el-table-column>
        <el-table-column prop="customerOrderNo" label="客户订单" width="120">
        </el-table-column>
        <el-table-column prop="createDate" label="下单时间" column-key="createDate" :formatter="formatTime" width="140">
        </el-table-column>
        <el-table-column prop="orderName" label="订单名称" width="160">
        </el-table-column>
        <el-table-column prop="customerCompany" label="客户公司">
        </el-table-column>
        <el-table-column prop="state" label="订单状态" column-key="state" :formatter="formatState">
        </el-table-column>
        <el-table-column prop="specs" label="规格">
        </el-table-column>
        <el-table-column prop="price" label="单价">
        </el-table-column>
        <el-table-column prop="count" label="数量">
        </el-table-column>
        <el-table-column prop="money" label="金额">
          <template scope="scope">
            {{ scope.row.price*scope.row.count }}
          </template>
        </el-table-column>
        <el-table-column prop="customerDeliveryDate" column-key="customerDeliveryDate" :formatter="formatTime" label="客户交期" width="120">
        </el-table-column>
        <el-table-column prop="reconciliationMonth" label="对帐月份" column-key="reconciliationMonth" :formatter="formatTime">
        </el-table-column>
        <el-table-column prop="deliveryDate" label="送货日期" column-key="deliveryDate" :formatter="formatTime" width="120">
        </el-table-column>
        <el-table-column prop="deliveryCount" label="送货数量">
        </el-table-column>
        <el-table-column prop="deficit" label="欠量">
          <template scope="scope">
            {{ scope.row.count - scope.row.deliveryCount }}
          </template>
        </el-table-column>
        <el-table-column prop="departmentCode" label="部门代码">
        </el-table-column>
        <el-table-column prop="contacts" label="联系人">
        </el-table-column>
        <el-table-column prop="user" label="使用人">
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
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 50, 100, 200]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
      orderStatus: "",
      searchStr: "",
      tableData: [],
      currentPage: 1,
      pageSize: 20,
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
        .post("/order/getOrderList", {
          searchStr: that.searchStr,
          pageSize: that.pageSize,
          currentPage: that.currentPage
        })
        .then(function(response) {
          if (response.status === 200) {
            that.tableData = response.data.list;
            that.total = response.data.count;
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
      if (column.columnKey === "customerDeliveryDate") {
        return convertDate(row.customerDeliveryDate).substring(0, 10);
      }
      if (column.columnKey === "reconciliationMonth") {
        return convertDate(row.reconciliationMonth).substring(0, 7);
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
          customerOrderNo: "客户订单",
          createDate: "下单时间",
          orderName: "订单名称",
          customerCompany: "客户公司",
          state: "订单状态",
          specs: "规格",
          price: "单价",
          count: "数量",
          money: "金额",
          customerDeliveryDate: "客户交期",
          reconciliationMonth: "对帐月份",
          deliveryDate: "送货日期",
          deliveryCount: "送货数量",
          deficit: "欠量",
          departmentCode: "部门代码",
          contacts: "联系人",
          user: "使用人",
          remark: "备注"
        }
      ];

      this.tableData.forEach((item, key) => {
        item.createDate = convertDate(item.createDate);
        item.deliveryDate = convertDate(item.deliveryDate).substring(0, 10);
        item.customerDeliveryDate = convertDate(item.deliveryDate).substring(
          0,
          10
        );
        item.reconciliationMonth = convertDate(
          item.reconciliationMonth
        ).substring(0, 7);
        item.money = item.price * item.count;
        item.deficit = item.count - item.deliveryCount;
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
            customerOrderNo: item["客户订单"],
            orderName: item["订单名称"],
            customerCompany: item["客户公司"],
            state: item["订单状态"],
            specs: item["规格"],
            price: item["单价"],
            count: item["数量"],
            customerDeliveryDate: item["客户交期"],
            reconciliationMonth: item["对帐月份"],
            deliveryDate: item["送货日期"],
            deliveryCount: item["送货数量"],
            departmentCode: item["部门代码"],
            contacts: item["联系人"],
            user: item["使用人"],
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
      this.pageSize = val;
      this.loadList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadList();
    }
  }
};
</script>
<style scoped>
</style>
