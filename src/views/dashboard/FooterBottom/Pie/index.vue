<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "pie",
  mounted() {
    let pie = echarts.init(this.$refs.charts);

    pie.setOption({
      title: {
        text: "Referer of a Website",
        subtext: "Fake Data",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "销售额占比",
          type: "pie",
          radius: ["40%", "70%"],
          data: [
            { value: 1048, name: "书亦烧仙草" },
            { value: 735, name: "古茗" },
            { value: 580, name: "茶百道" },
            { value: 484, name: "COCO" },
            { value: 300, name: "一㸃㸃" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 400px;
  margin-top: 30px;
}
</style>