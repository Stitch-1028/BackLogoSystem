<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: ["payNumber"],
  name: "payNumber",
  data() {
    return {
      
    }
  },
  mounted() {
    let charts = echarts.init(this.$refs.charts);
    if (this.payNumber == "first") {
      charts.setOption({
        title: {
          text: "销售额",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: [
          {
            type: "category",
            data: [
              "一月",
              "二月",
              "三月",
              "四月",
              "五月",
              "六月",
              "七月",
              "八月",
              "九月",
              "十月",
              "十一月",
              "十二月",
            ],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "销售额",
            type: "bar",
            barWidth: "60%",
            data: [70, 52, 200, 334, 390, 330, 220, 109, 303, 400, 120, 205],
            itemStyle: {
              color: "#a90000",
            },
          },
        ],
      });
    } else {
      charts.setOption({
        title: {
          text: "访问量",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: [
          {
            type: "category",
            data: [
              "一月",
              "二月",
              "三月",
              "四月",
              "五月",
              "六月",
              "七月",
              "八月",
              "九月",
              "十月",
              "十一月",
              "十二月",
            ],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "访问量",
            type: "bar",
            barWidth: "60%",
            data: [
              10000, 30648, 10997, 53064, 20489, 46320, 27891, 19350, 35960,
              40256, 13025, 30521,
            ],
            itemStyle: {
              color: "#a90000",
            },
          },
        ],
      });
    }
  },
  watch: {
    payNumber(newValue, oldValue) {
      let charts = echarts.init(this.$refs.charts);
      if (this.payNumber == "first") {
        charts.setOption({
          title: {
            text: "销售额",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          xAxis: [
            {
              type: "category",
              data: [
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月",
              ],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "销售额",
              type: "bar",
              barWidth: "60%",
              data: [70, 52, 200, 334, 390, 330, 220, 109, 303, 400, 120, 205],
              itemStyle: {
                color: "#a90000",
              },
            },
          ],
        });
      } else {
        charts.setOption({
          title: {
            text: "访问量",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          xAxis: [
            {
              type: "category",
              data: [
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月",
              ],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "访问量",
              type: "bar",
              barWidth: "60%",
              data: [
                10000, 30648, 10997, 53064, 20489, 46320, 27891, 19350, 35960,
                40256, 13025, 30521,
              ],
              itemStyle: {
                color: "#a90000",
              },
            },
          ],
        });
      }
    },
  },
};
</script>

<style scoped>
.charts {
  height: 350px;
}
</style>