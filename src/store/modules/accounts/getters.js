// import { months } from "../../../constants/dates";

const getters = {
  getTransactionsChartData(state) {
    const transactions = state.account.currentMonthTransactions;

    if (!transactions) return;

    const groupedTransactions = {};
    let prevValue = 0;

    transactions.forEach((transaction) => {
      if (!groupedTransactions[transaction.createdAt]) {
        groupedTransactions[transaction.createdAt] = {
          amount: 0,
          tooltips: [],
        };
      }
      groupedTransactions[transaction.createdAt].amount =
        transaction.type === "income"
          ? prevValue + transaction.amount
          : prevValue - transaction.amount;

      groupedTransactions[transaction.createdAt].tooltips.push({
        description: transaction.description,
        amount:
          transaction.type === "income"
            ? transaction.amount
            : -transaction.amount,
      });
      prevValue = groupedTransactions[transaction.createdAt].amount;
    });

    return Object.keys(groupedTransactions).map((transaction) => ({
      date: transaction,
      amount: groupedTransactions[transaction].amount,
      tooltips: groupedTransactions[transaction].tooltips,
    }));
  },
  getMonthlyProfits(state) {
    let monthProfits = [];

    if (!state.account.AccountMonths) return null;

    state.account.AccountMonths.forEach((month) => {
      monthProfits[month.month] = month.profit;
    });

    for (let index of monthProfits.keys()) {
      if (!monthProfits[index]) {
        monthProfits[index] = monthProfits[index - 1] || 0;
      }
    }

    return monthProfits;
  },
  getMonthlyExpenses(state) {
    let monthExpenses = [];

    if (!state.account.AccountMonths) return null;

    state.account.AccountMonths.forEach((month) => {
      monthExpenses[month.month] = month.expenses;
    });

    for (let index of monthExpenses.keys()) {
      if (!monthExpenses[index]) {
        monthExpenses[index] = monthExpenses[index - 1] || 0;
      }
    }

    return monthExpenses;
  },
};

export default getters;
