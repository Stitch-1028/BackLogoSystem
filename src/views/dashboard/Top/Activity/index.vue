<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "activity",
  mounted() {
    let activity = echarts.init(this.$refs.charts);

    activity.setOption({
      
      xAxis:{
        show:false,
        min:0,
        max:100
      },

      yAxis:{
          type:'category',
          show:false,
      },

      series:[{
          type:'bar',
          data:[78],
          barWidth:8,
          color:'yellowgreen',
          showBackground:true,
          label:{
              show:true,
              formatter:'|',
              position:'right'
          }
      }]
      
    });
  },
};
</script>

<style>
</style>