<template>
  <div class="chart__container">
    <base-card>
      <canvas :id="id" :height="200" class="chart"></canvas>
      <p class="chart__msg" v-if="noValue">{{ errorMsg }}</p>
    </base-card>
  </div>
</template>

<script>
import Chart from "chart.js";
import { dataset, chartData } from "../../constants/chartData";

export default {
  props: ["id", "data", "type", "label", "labels", "noValue", "errorMsg"],
  watch: {
    data() {
      this.chart.destroy();
      this.createChart();
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  methods: {
    createChart() {
      const ctx = document.getElementById(this.id).getContext("2d");
      const chartDataset = this.buildChartDataset();
      const chartData = this.buildChartData(chartDataset);

      this.chart = new Chart(ctx, chartData);
    },
    buildChartDataset() {
      return {
        labels: this.labels,
        dataset: {
          ...dataset,
          data: this.data,
          label: this.label,
        },
      };
    },
    getMaxValue(arr) {
      let max = 0;

      arr.forEach((item) => (max = Math.max(max, item)));

      return max;
    },
    getNextIntDivisor(value, divisor) {
      return value + divisor - ((value + divisor) % divisor);
    },
    buildChartData(chartDataset) {
      const { labels, dataset } = chartDataset;

      const maxDataValue = this.getMaxValue(dataset.data);
      const yAxesMax = this.getNextIntDivisor(maxDataValue, 5);

      return {
        ...chartData,
        type: this.type,
        data: {
          ...chartData.data,
          labels,
          datasets: [dataset],
        },
        options: {
          ...chartData.options,
          tooltips: {
            enabled: true,
            callbacks: {
              label: function(tooltipItems) {
                return `${dataset.data[tooltipItems.index].toFixed(2)}€`;
              },
            },
          },
          scales: {
            ...chartData.options.scales,
            yAxes: [
              {
                ...chartData.options.scales.yAxes[0],
                ticks: {
                  ...chartData.options.scales.yAxes[0].ticks,
                  max: yAxesMax,
                  stepSize: yAxesMax / 5,
                },
              },
            ],
          },
        },
      };
    },
  },
  mounted() {
    this.createChart();
  },
};
</script>

<style scoped>
.chart__container {
  position: relative;
}

.chart {
  border-radius: 3px;
  /* height: 200px; */
}

.chart__msg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--primary-light);
  padding: 16px;
  border: 2px solid var(--secondary);
  border-radius: 3px;
  color: var(--secondary);
  width: 60%;
  text-align: center;
}
</style>
