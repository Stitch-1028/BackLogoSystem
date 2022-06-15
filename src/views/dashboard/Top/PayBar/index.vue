<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "payBar",
  mounted() {
    let payBar = echarts.init(this.$refs.charts);

    payBar.setOption({
      xAxis: {
        type: "category",
        show:false
      },
      yAxis: {
        show:false
      },
      series: [
        {
          data: [120, 200, 150, 100, 70, 110, 130,87,99,70,160,40],
          type: "bar",
        },
      ],
    });
  },
};
</script>

<style>
</style>