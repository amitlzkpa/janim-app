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
          type: "line",
          toolbar: {
            show: false,
          },
        },
        colors: ["#dedede", "#ff0080"],
        stroke: {
          curve: "smooth",
        },
        series: [
          {
            name: "Fendi Winter Drop",
            data: [
              [1622541656, 30],
              [1622991656, 40],
              [1623164456, 35],
              [1624254456, 50],
              [1624854456, 49],
              [1625724456, 60],
              [1625784456, 70],
              [1626284456, 91],
              [1626872456, 125],
            ],
          },
          {
            name: "Selena Spree",
            data: [
              [1622541656, 74],
              [1622991656, 30],
              [1623164456, 35],
              [1624254456, 74],
              [1624854456, 39],
              [1625724456, 60],
              [1625784456, 74],
              [1626284456, 31],
              [1626872456, 135],
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