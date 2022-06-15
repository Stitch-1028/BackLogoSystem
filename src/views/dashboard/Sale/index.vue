<template>
  <el-card class="box-card">
    <!-- 头部区域 -->
    <div slot="header" class="clearfix">
      <!-- 左侧内容 -->
      <el-tabs style="width: 100%" v-model="payNumber">
        <el-tab-pane label="销售额" name="first"></el-tab-pane>
        <el-tab-pane label="访问量" name="second"></el-tab-pane>
      </el-tabs>

      <!-- 右侧内容 -->
      <div class="rightTime">
        <span>今日</span
        >&emsp;<span>本周</span>&emsp;<span>本月</span>&emsp;<span>本年</span>&emsp;
        <el-date-picker
          size="mini"
          v-model="value"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
    </div>

    <!-- 展示区域 -->
    <el-row :gutter="10" v-if="payNumber=='first'">
      <el-col :span="18"><PayNumber :payNumber="payNumber"></PayNumber></el-col>
      <el-col :span="6">
       <h3 style="margin-top:0px">门店销售额排名</h3>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="排名" width="70" type="index">
          </el-table-column>
          <el-table-column prop="name" label="门店" width="140">
          </el-table-column>
          <el-table-column prop="number" label="销售额"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row :gutter="10" v-if="payNumber=='second'">
      <el-col :span="18"><PayNumber :payNumber="payNumber"></PayNumber></el-col>
      <el-col :span="6">
       <h3 style="margin-top:0px">门店销售额排名</h3>
        <el-table :data="payNumber=='first'?tableData:visitData" style="width: 100%">
          <el-table-column label="排名" width="70" type="index">
          </el-table-column>
          <el-table-column prop="name" label="门店" width="140">
          </el-table-column>
          <el-table-column prop="number" :label="payNumber=='first'?'销售额':'访问量'"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    



  </el-card>
</template>

<script>
import PayNumber from "./PayNumber";
export default {
  components: { PayNumber },
  name: "sale",
  data() {
    return {
      value: "",
      payNumber: "first",
      tableData: [{
            name: '书亦烧仙草',
            number: '54321'
          }, {
            name: '古茗',
            number: '45123'
          }, {
            name: 'COCO',
            number: '36975'
          }, {
            name: '一㸃㸃',
            number: '34692'
          },{
            name: '茶百道',
            number: '32057'
      }],
      visitData:[{
            name: '书亦烧仙草',
            number: '603914'
          }, {
            name: '古茗',
            number: '598602'
          }, {
            name: 'COCO',
            number: '569347'
          }, {
            name: '一㸃㸃',
            number: '506913'
          },{
            name: '茶百道',
            number: '496357'
      }]
    };
  },
};
</script>

<style>
.el-card__header {
  border: 0;
}
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.rightTime {
  position: absolute;
  right: 0px;
}

ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}


</style>