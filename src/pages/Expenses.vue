<template>
  <chart id="monthly-expenses" type="line" :data="transactionsExpenses" />
  <chart id="monthly-profit" type="line" :data="transactionsProfit" />
</template>

<script>
import Chart from "../components/Chart";
import { dataset, chartData } from "./chart-data";

export default {
  components: {
    chart: Chart,
  },
  methods: {
    fetchAccountData() {
      this.$store.dispatch("account/getAccountData");
    },
    buildChartDataset(label, values) {
      return {
        labels: values.map((value) => value.createdAt),
        dataset: {
          ...dataset,
          data: values.map((value) => value.amount),
          label,
        },
      };
    },
    buildChartData(type, labels, datasets) {
      // const data = [0, 1];
      return {
        ...chartData,
        type,
        data: {
          labels,
          datasets,
          tooltips: [0, 1],
        },
        options: {
          ...chartData.options,
          tooltips: {
            enabled: true,
            callbacks: {
              label: function(tooltipItems, data) {
                console.log("Tooltip:", data);
                return tooltipItems.yLabel;
              },
            },
          },
        },
      };
    },
  },
  computed: {
    transactionsExpenses() {
      const transactions = this.$store.getters[
        "account/getTransactionsExpenses"
      ];
      const transactionsChartData = this.buildChartDataset(
        "Monthly Expenses",
        transactions
      );

      const chartData = this.buildChartData(
        "line",
        transactionsChartData.labels,
        [transactionsChartData.dataset]
      );

      return chartData;
    },
    transactionsProfit() {
      const transactions = this.$store.getters["account/getTransactionsProfit"];
      const transactionsChartData = this.buildChartDataset(
        "Monthly Profit",
        transactions
      );

      const chartData = this.buildChartData(
        "line",
        transactionsChartData.labels,
        [transactionsChartData.dataset]
      );

      return chartData;
    },
  },
  created() {
    this.fetchAccountData();
  },
};
</script>

<style scoped>
.chart {
  background-color: #303841;
}
</style>
