<template>
  <section class="section section--charts">
    <chart
      id="month-balance"
      type="line"
      v-if="chartMonthtlyProfits"
      :data="chartMonthtlyProfits.chartData"
      :noValue="!chartMonthtlyProfits.hasValue"
      errorMsg="No data available. Try adding some transactions."
    />
    <chart
      v-if="chartMonthtlyExpenses"
      id="monthly-profit"
      type="line"
      :data="chartMonthtlyExpenses.chartData"
      :noValue="!chartMonthtlyProfits.hasValue"
      errorMsg="No data available. Try adding some transactions."
    />
    <!-- <chart
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
    buildChartDataset(label, data, isMonthly) {
      return {
        labels: isMonthly ? monthlyChartLabels() : [],
        dataset: {
          ...dataset,
          data,
          label,
        },
      };
    },
    buildChartData(type, labels, datasets) {
      return {
        ...chartData,
        type,
        data: {
          ...chartData.data,
          labels,
          datasets,
        },
        options: {
          ...chartData.options,
          // tooltips: {
          //   enabled: true,
          //   callbacks: {
          //     label: function(tooltipItems, data) {
          //       const tooltips = data.tooltips[tooltipItems.index].map(
          //         (tooltip) => `${tooltip.description} : ${tooltip.amount}€`
          //       );
          //       return tooltips;
          //     },
          //   },
          // },
        },
      };
    },
  },
  computed: {
    chartMonthtlyProfits() {
      const profits = this.$store.getters["account/getMonthlyProfits"];

      if (!profits) return null;

      const transactionsChartData = this.buildChartDataset(
        "Monthly Profit",
        profits,
        true
      );

      const chartData = this.buildChartData(
        "line",
        transactionsChartData.labels,
        [transactionsChartData.dataset]
      );

      return { chartData, hasValue: profits.length > 0 };
    },
    chartMonthtlyExpenses() {
      const expenses = this.$store.getters["account/getMonthlyExpenses"];

      if (!expenses) return null;

      const montlyProfitChartData = this.buildChartDataset(
        "Monthly Expenses",
        expenses,
        true
      );

      const chartData = this.buildChartData(
        "line",
        montlyProfitChartData.labels,
        [montlyProfitChartData.dataset]
      );

      return { chartData, hasValue: expenses.length > 0 };
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
