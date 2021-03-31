<template>
  <router-view></router-view>
  <section class="section">
    <div class="balances">
      <base-card>
        <div class="balances__annual">
          <div class="balances__description">
            <h2>Total Balance</h2>
            <span>{{ totalBalance }} €</span>
          </div>
          <base-button :isLink="true" mode="primary" path="/expenses/add"
            >Add Transaction</base-button
          >
        </div>
      </base-card>
      <div class="balances__monthly">
        <base-card>
          <div class="balances__month">
            <h2>Current Month Profit</h2>
            <span>{{ monthProfitExpenses.profit }} €</span>
          </div>
        </base-card>
        <base-card>
          <div class="balances__month">
            <h2>Current Month Expenses</h2>
            <span>{{ monthProfitExpenses.expenses }} €</span>
          </div>
        </base-card>
      </div>
    </div>
    <div class="charts">
      <chart
        id="monthly-profits"
        type="line"
        v-if="chartMonthtlyProfits"
        :data="chartMonthtlyProfits.chartData"
        :noValue="!chartMonthtlyProfits.hasValue"
        errorMsg="No data available. Try adding some transactions."
      />
      <chart
        v-if="chartMonthtlyExpenses"
        id="monthly-expenses"
        type="line"
        :data="chartMonthtlyExpenses.chartData"
        :noValue="!chartMonthtlyExpenses.hasValue"
        errorMsg="No data available. Try adding some transactions."
      />
      <chart
        v-if="chartTransactionsProfits"
        id="transactions-profits"
        type="line"
        :data="chartTransactionsProfits.chartData"
        :noValue="!chartTransactionsProfits.hasValue"
        errorMsg="No profits for the current month"
      />
      <chart
        v-if="chartTransactionsExpenses"
        id="transactions-expenses"
        type="line"
        :data="chartTransactionsExpenses.chartData"
        :noValue="!chartTransactionsExpenses.hasValue"
        errorMsg="No expenses for the current month"
      />
    </div>
  </section>
</template>

<script>
import Chart from "../components/Chart";
import { dataset, chartData } from "./chart-data";
import { monthlyChartLabels, dailyChartLabels } from "../util/dates";

export default {
  components: {
    chart: Chart,
  },
  inject: ["errorHandler"],
  methods: {
    async fetchAccountData() {
      try {
        await this.$store.dispatch("account/getAccountData");
      } catch (e) {
        this.errorHandler(e, {
          redirect: {
            name: "Authentication",
            query: { redirect: this.$route.path },
          },
        });
      }
    },
    buildChartDataset(label, data, isMonthly) {
      return {
        labels: isMonthly ? monthlyChartLabels() : dailyChartLabels(),
        dataset: {
          ...dataset,
          data,
          label,
        },
      };
    },
    getMaxValue(arr) {
      let max = 0;

      arr.forEach((item) => (max = Math.max(max, item)));

      return max;
    },
    getNextIntDivisor(value, divisor) {
      return value + divisor - ((value + divisor) % 5);
    },
    buildChartData(type, labels, datasets) {
      const maxDataValue = this.getMaxValue(datasets.data);
      const yAxesMax = this.getNextIntDivisor(maxDataValue, 5);
      return {
        ...chartData,
        type,
        data: {
          ...chartData.data,
          labels,
          datasets: [datasets],
        },
        options: {
          ...chartData.options,
          tooltips: {
            enabled: true,
            callbacks: {
              label: function(tooltipItems) {
                return `${datasets.data[tooltipItems.index].toFixed(2)}€`;
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
        transactionsChartData.dataset
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
        montlyProfitChartData.dataset
      );

      return { chartData, hasValue: expenses.length > 0 };
    },
    chartTransactionsExpenses() {
      let expenses = this.$store.getters["account/getTransactionsExpenses"];

      if (!expenses) return null;

      const hasValue = expenses.some((expense) => expense > 0);

      if (!hasValue) {
        expenses = [];
      }

      const montlyTransactionsChartData = this.buildChartDataset(
        "Daily Expenses",
        expenses
      );

      const chartData = this.buildChartData(
        "line",
        montlyTransactionsChartData.labels,
        montlyTransactionsChartData.dataset
      );

      return {
        chartData,
        hasValue,
      };
    },
    chartTransactionsProfits() {
      let profits = this.$store.getters["account/getTransactionsProfits"];

      if (!profits) return null;

      const hasValue = profits.some((profit) => profit > 0);

      if (!hasValue) {
        profits = [];
      }

      const montlyTransactionsChartData = this.buildChartDataset(
        "Daily Profits",
        profits
      );

      const chartData = this.buildChartData(
        "line",
        montlyTransactionsChartData.labels,
        montlyTransactionsChartData.dataset
      );

      return {
        chartData,
        hasValue,
      };
    },
    totalBalance() {
      const totalBalance = this.$store.getters["account/getTotalBalance"];
      return totalBalance;
    },
    monthProfitExpenses() {
      const monthProfitExpenses = this.$store.getters[
        "account/getMonthProfitExpenses"
      ];
      return monthProfitExpenses;
    },
  },
  created() {
    this.fetchAccountData();
  },
};
</script>

<style scoped>
.section > *:not(:last-child) {
  margin-bottom: 16px;
}

.balances__annual {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.balances > *:not(:last-child),
.balances__description > *:not(:last-child),
.balances__month > *:not(:last-child),
.balances__monthly > *:not(:last-child),
.charts > *:not(:last-child) {
  margin-bottom: 8px;
}

.balances__month {
  padding: 16px;
}

@media screen and (min-width: 768px) {
  .balances__monthly {
    display: flex;
    gap: 16px;
  }

  .balances__monthly > *:not(:last-child) {
    margin-bottom: 0;
  }

  .balances__monthly > * {
    width: 50%;
  }

  .balances__annual {
    margin-bottom: 16px;
  }
}

@media screen and (min-width: 850px) {
  .charts {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .charts > *:not(:last-child) {
    margin-bottom: 0;
  }
}
</style>
