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
    <div class="spinner" v-if="isLoading">
      <base-spinner />
    </div>
    <div class="charts" v-else>
      <chart
        id="monthly-profits"
        type="line"
        :data="getMonthlyData.profits.data"
        :noValue="!getMonthlyData.profits.hasValue"
        label="Monthly Profits"
        :labels="monthlyChartLabels"
        errorMsg="No data available. Try adding some transactions."
      />
      <chart
        id="monthly-expenses"
        type="line"
        :data="getMonthlyData.expenses.data"
        :noValue="!getMonthlyData.expenses.hasValue"
        label="Monthly Expenses"
        :labels="monthlyChartLabels"
        errorMsg="No data available. Try adding some transactions."
      />
      <chart
        id="transactions-profits"
        type="line"
        :data="getDailyData.profits.data"
        :noValue="!getDailyData.profits.hasValue"
        label="Daily Profits"
        :labels="dailyChartLabels"
        errorMsg="No profits for the current month"
      />
      <chart
        id="transactions-expenses"
        type="line"
        :data="getDailyData.expenses.data"
        :noValue="!getDailyData.expenses.hasValue"
        label="Daily Profits"
        :labels="dailyChartLabels"
        errorMsg="No expenses for the current month"
      />
    </div>
  </section>
</template>

<script>
import Chart from "../components/Chart";
import { monthlyChartLabels, dailyChartLabels } from "../util/dates";

export default {
  components: {
    chart: Chart,
  },
  inject: ["errorHandler"],
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async fetchAccountData() {
      this.isLoading = true;
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
      this.isLoading = false;
    },
  },
  computed: {
    monthlyChartLabels() {
      return monthlyChartLabels();
    },
    dailyChartLabels() {
      return dailyChartLabels();
    },
    getMonthlyData() {
      const data = this.$store.getters["account/getMonthlyData"];
      const { monthProfits, monthExpenses } = data;

      return {
        profits: { data: monthProfits, hasValue: monthProfits.length > 0 },
        expenses: {
          data: monthExpenses,
          hasValue: monthExpenses.length > 0,
        },
      };
    },
    getDailyData() {
      const data = this.$store.getters["account/getTransactionsData"];
      let { transactionsExpenses, transactionsProfits } = data;

      const hasExpenses = transactionsExpenses.some((expense) => expense > 0);
      const hasProfits = transactionsProfits.some((expense) => expense > 0);

      if (!hasExpenses) transactionsExpenses = [];
      if (!hasProfits) transactionsProfits = [];

      return {
        profits: { data: transactionsProfits, hasValue: hasProfits },
        expenses: { data: transactionsExpenses, hasValue: hasExpenses },
      };
    },
    totalBalance() {
      const totalBalance = this.$store.getters["account/getTotalBalance"];
      return totalBalance || 0;
    },
    monthProfitExpenses() {
      const monthProfitExpenses = this.$store.getters[
        "account/getMonthProfitExpenses"
      ];
      return monthProfitExpenses;
    },
    hasAccountData() {
      return this.$store.getters["account/hasAccountData"];
    },
  },
  created() {
    if (this.hasAccountData) return;
    this.fetchAccountData();
  },
};
</script>

<style scoped>
.spinner {
  display: flex;
  justify-content: center;
}

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
    gap: 1rem;
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
