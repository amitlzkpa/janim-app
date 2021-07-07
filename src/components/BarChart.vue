<template>
  <div style="width: 100%" id="apex-chart"></div>
</template>

<script>
import ApexCharts from "apexcharts";

let defaultData = {};

export default {
  data() {
    {
      return {
        data: defaultData,
      };
    }
  },
  async mounted() {
    this.refreshChart();
  },
  methods: {
    refreshChart() {
      let that = this;
      let options = {
        chart: {
          type: "bar",
          toolbar: {
            show: false,
          },
        },
        colors: ["#dedede", "#dedede", "#ff0080", "#dedede"],
        series: [
          {
            name: "Fendi Winter Drop",
            data: [
              17628, 20808, 23197, 21649, 15716, 23920, 14028, 17950, 23257,
              15056, 22865, 16743, 23885, 17462, 16479, 16278, 14988, 21142,
              15869, 26206,
            ],
          },
          {
            name: "Selena Spree",
            data: [
              14332, 23944, 21187, 24607, 18139, 17878, 21218, 15958, 22002,
              15741, 23989, 15372, 18603, 18029, 26674, 26178, 18443, 20128,
              22536, 24221,
            ],
          },
          {
            name: "Emporium Release",
            data: [
              0, 0, 0, 24607, 0, 17878, 0, 15958, 22002, 15741, 0, 15372, 18603,
              0, 0, 0, 0, 20128, 22536, 24221,
            ],
          },
          {
            name: "Where Are You Going?",
            data: [
              14332, 23944, 21187, 24607, 18139, 17878, 21218, 15958, 22002,
              15741, 23989, 15372, 18603, 18029, 26674, 26178, 18443, 20128,
              22536, 24221,
            ],
          },
        ],
        xaxis: {
          type: "datetime",
        },
        xaxis: {
          labels: {
            formatter: function (value) {
              return that.moment(value).format("MMM DD");
            },
          },
        },
        grid: {
          borderColor: "#dedede",
          strokeDashArray: 2,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
      };

      let chart = new ApexCharts(
        document.querySelector("#apex-chart"),
        options
      );

      chart.render();
    },
  },
};
</script>

<style scoped>
</style>