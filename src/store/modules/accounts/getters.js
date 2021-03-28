// import { months } from "../../../constants/dates";

const getters = {
  getTransactionsExpenses(state) {
    const currentDay = new Date().getDate();
    const transactionsExpenses = Array(currentDay);

    if (!state.account.AccountMonths || !state.account.AccountMonths.length > 0)
      return transactionsExpenses;

    const { AccountTransactions } = state.account.AccountMonths.find(
      (accountMonth) => accountMonth.AccountTransactions.length !== 0
    );

    AccountTransactions.forEach((transaction) => {
      if (transaction.type === "outcome") {
        const day =
          +transaction.transactionDate.slice(
            transaction.transactionDate.length - 2
          ) - 1;
        transactionsExpenses[day] =
          (transactionsExpenses[day] || 0) + transaction.amount;
      }
    });

    for (let index of transactionsExpenses.keys()) {
      if (!transactionsExpenses[index]) {
        transactionsExpenses[index] = 0;
      }
    }

    return transactionsExpenses;
  },
  getTransactionsProfits(state) {
    const currentDay = new Date().getDate();
    const transactionsProfits = Array(currentDay);

    if (!state.account.AccountMonths || !state.account.AccountMonths.length > 0)
      return transactionsProfits;

    const { AccountTransactions } = state.account.AccountMonths.find(
      (accountMonth) => accountMonth.AccountTransactions.length !== 0
    );

    AccountTransactions.forEach((transaction) => {
      if (transaction.type === "income") {
        const day = transaction.transactionDate.slice(
          transaction.transactionDate.length - 2
        );
        transactionsProfits[+day - 1] = transaction.amount;
      }
    });

    for (let index of transactionsProfits.keys()) {
      if (!transactionsProfits[index]) {
        transactionsProfits[index] = 0;
      }
    }

    return transactionsProfits;
  },
  getMonthlyProfits(state) {
    const monthProfits = [];

    if (!state.account.AccountMonths || !state.account.AccountMonths.length > 0)
      return monthProfits;

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
    const monthExpenses = [];

    if (!state.account.AccountMonths || !state.account.AccountMonths.length > 0)
      return monthExpenses;

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
  getTotalBalance(state) {
    return state.account.balance;
  },
  getMonthProfitExpenses(state) {
    if (!state.account.AccountMonths || !state.account.AccountMonths.length > 0)
      return { profit: 0, expenses: 0 };

    const month = new Date().getMonth();

    const { profit, expenses } = state.account.AccountMonths.find(
      (accountMonth) => accountMonth.month === month
    );

    return { profit: profit.toFixed(2), expenses: expenses.toFixed(2) };
  },
};

export default getters;
