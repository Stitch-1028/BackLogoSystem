<template>
  <el-row>
    <el-col :span="6"><Detail title="总销售额" count="$126560">
        <template slot="charts">
         <span>周同比 &emsp; &emsp; 56.67%</span>
         <span>日同比 &emsp; &emsp; 19.96%</span>
        </template>
        <template slot="chartsBom">
          <span>日销售额$12423</span>
        </template>
      </Detail></el-col>

    <el-col :span="6"><Detail title="访问量" count="88460">
        <template slot="charts">
          <LineChart></LineChart>
        </template>

        <template slot="chartsBom">
          <span>日访问量&emsp;12423</span>
        </template>
        </Detail></el-col>

    <el-col :span="6"><Detail title="支付笔数" count="88460">
        
        <template slot="charts">
          <PayBar></PayBar>
        </template>
        
        <template slot="chartsBom">
          <span>转化率65%</span>
        </template>
        </Detail></el-col>

    <el-col :span="6"><Detail title="运营活动效果" count="78%">

      <template slot="charts">
        <Activity></Activity>
      </template>

      <template slot="chartsBom">
          <span>周同比 &emsp; &emsp; 56.67%</span>
         <span>日同比 &emsp; &emsp; 19.96%</span>
        </template>
      </Detail></el-col>
  </el-row>
</template>

<script>
import Detail from "./Detail"
import LineChart from "./LineChart"
import PayBar from "./PayBar"
import Activity from "./Activity"
export default {
  components:{Detail,LineChart,PayBar,Activity},
  name:'top'
}
</script>

<style>
    
</style>