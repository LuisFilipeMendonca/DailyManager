<template>
  <section class="section section--charts">
    <chart id="month-balance" type="line" :data="chartTransactions" />
    <!-- <chart
      v-if="chartTransactions"
      id="monthly-profit"
      type="line"
      :data="chartMonthtlyProfits"
    />
    <chart
      v-if="chartTransactions"
      id="monthly-expenses"
      type="line"
      :data="chartMonthlyExpenses"
    /> -->
  </section>
</template>

<script>
import Chart from "../components/Chart";
import { dataset, chartData } from "./chart-data";
import { monthlyChartLabels } from "../util/dates";

export default {
  components: {
    chart: Chart,
  },
  methods: {
    fetchAccountData() {
      this.$store.dispatch("account/getAccountData");
    },
    buildChartDataset(label, isMonthly) {
      return {
        tooltips: [],
        labels: isMonthly ? monthlyChartLabels() : [],
        dataset: {
          ...dataset,
          data: [1, 2, 2, 1],
          label,
        },
      };
    },
    buildChartData(type, labels, datasets, tooltips) {
      return {
        ...chartData,
        type,
        data: {
          ...chartData.data,
          labels,
          datasets,
          tooltips,
        },
        options: {
          ...chartData.options,
          tooltips: {
            enabled: true,
            // callbacks: {
            //   label: function(tooltipItems, data) {
            //     const tooltips = data.tooltips[tooltipItems.index].map(
            //       (tooltip) => `${tooltip.description} : ${tooltip.amount}€`
            //     );
            //     return tooltips;
            //   },
            // },
          },
        },
      };
    },
  },
  computed: {
    chartTransactions() {
      const profits = this.$store.getters["account/getMonthlyProfits"];
      console.log(profits);
      const transactionsChartData = this.buildChartDataset(
        "Current Month Balance",
        true
      );

      const chartData = this.buildChartData(
        "line",
        transactionsChartData.labels,
        [transactionsChartData.dataset],
        transactionsChartData.tooltips
      );

      return chartData;
    },
    chartMonthtlyProfits() {
      const profits = this.$store.getters["account/getMonthlyProfits"];

      if (!profits) return null;

      const montlyProfitChartData = this.buildChartDataset(
        "Monthly Profit",
        profits
      );

      const chartData = this.buildChartData(
        "line",
        montlyProfitChartData.labels,
        [montlyProfitChartData.dataset],
        montlyProfitChartData.tooltips
      );

      return chartData;
    },
    chartMonthlyExpenses() {
      const expenses = this.$store.getters["account/getMonthlyExpenses"];

      if (!expenses) return null;

      const monthlyExpensesChartData = this.buildChartDataset(
        "Monthly Expenses",
        expenses
      );

      const chartData = this.buildChartData(
        "line",
        monthlyExpensesChartData.labels,
        [monthlyExpensesChartData.dataset],
        monthlyExpensesChartData.tooltips
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
.section--charts > *:not(:last-child) {
  margin-bottom: 16px;
}

@media screen and (min-width: 992px) {
  .section--charts {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(2, 1fr);
  }

  .section--charts > *:not(:last-child) {
    margin-bottom: 0;
  }
}
</style>
