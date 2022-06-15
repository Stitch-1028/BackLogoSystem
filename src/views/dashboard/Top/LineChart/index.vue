<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "lineChart",
  mounted() {
    let lineChart = echarts.init(this.$refs.charts);

    lineChart.setOption({
      xAxis: {
        type: "category",
        show: false,
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          data: [10, 50, 30, 40,80,70,40,55, 80, 140],
          type: "line",
          smooth: true,
          symbol: "none",
          //   itemStyle:{
          //       opacticy:0
          //   },
          lineStyle: {
            color: "purple",
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
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "white", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      color: {},
    });
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>