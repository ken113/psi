<template>
  <div class="page-material">
    <div style="overflow:hidden;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:20px 0;float:left;">
        <el-breadcrumb-item :to="{ path: '/' }">采购业务</el-breadcrumb-item>
        <el-breadcrumb-item>材料物品管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary" style="float:right;margin-top:8px;">新增物料</el-button>
      <el-button style="float:right;margin:8px 10px 0 10px;">导出</el-button>

      <el-button type="primary" style="float:right;margin:8px 10px 0 10px;">搜索</el-button>
      <el-input style="float:right;margin:8px 10px 0 10px; width:350px;" placeholder="物料编码搜索,支持多编码空格隔开搜索" />
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="number" label="物料编号">
      </el-table-column>
      <el-table-column prop="name" label="物料名称">
      </el-table-column>
      <el-table-column prop="spec" label="规格">
      </el-table-column>
      <el-table-column prop="code" label="助记码">
      </el-table-column>
      <el-table-column prop="type" label="种类">
      </el-table-column>
      <el-table-column prop="unit" label="单位">
      </el-table-column>
      <el-table-column prop="min" label="最低库存">
      </el-table-column>
      <el-table-column prop="max" label="最高库存">
      </el-table-column>
      <el-table-column prop="count" label="库存数">
      </el-table-column>
      <el-table-column prop="person" label="录入人员">
      </el-table-column>
      <el-table-column prop="date" label="录入时间" width='150'>
      </el-table-column>
      <el-table-column prop="modify" label="修改人员">
      </el-table-column>
      <el-table-column prop="modifydate" label="修改时间" width='150'>
      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "material",
  data() {
    return {
      tableData: [
        {
          number: "#001",
          name: "物料A",
          spec: "规格C",
          code: "Cu",
          type: "物料种类A",
          unit: "斤",
          min: "1800",
          max: "2000",
          count: "1850",
          person: "张文涛",
          date: "2019-06-21 08:12:19",
          modify: "张文涛",
          modifydate: "2019-06-21 12:12:31",
          remark: "来自外星的物料，看不懂！"
        },
        {
          number: "#008",
          name: "物料B",
          spec: "规格A",
          code: "BBBB",
          type: "物料种类C",
          unit: "斤",
          min: "1200",
          max: "20000",
          count: "1850",
          person: "陈新洋",
          date: "2019-06-21 08:12:19",
          modify: "宋金广",
          modifydate: "2019-06-31 12:12:31",
          remark: "来自地球的物料，不解释"
        }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
</style>
