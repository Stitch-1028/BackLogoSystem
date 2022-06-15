<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name:'UserFind',
    mounted() {
      let charts = echarts.init(this.$refs.charts)
      charts.setOption({
      xAxis: {
        type: "category",
        show: false,
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          data: [30,25,40,35,32,36,20,40],
          type: "line",
          smooth: true,
          symbol: "none",
          //   itemStyle:{
          //       opacticy:0
          //   },
          lineStyle: {
            color: "skyblue",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "white", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "skyblue", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      color: {},
    })
    },
}
</script>

<style>
.charts{
  margin-top:25px
}
</style>