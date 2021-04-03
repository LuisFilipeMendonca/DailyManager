// import { months } from "../../../constants/dates";

import Dates from "../../../helpers/Dates";

const getters = {
  getTransactionsData(state) {
    const currentDay = new Date().getDate();
    const transactionsExpenses = Array(currentDay);
    const transactionsProfits = Array(currentDay);

    if (!state.account.AccountMonths || !state.account.AccountMonths.length > 0)
      return { transactionsExpenses, transactionsProfits };

    const accountTransactions = state.account.AccountMonths.find(
      (accountMonth) => accountMonth.AccountTransactions.length !== 0
    );

    if (!accountTransactions)
      return { transactionsExpenses, transactionsProfits };

    const { AccountTransactions } = accountTransactions;

    AccountTransactions.forEach((transaction) => {
      const day =
        +transaction.transactionDate.slice(
          transaction.transactionDate.length - 2
        ) - 1;
      if (transaction.type === "outcome") {
        transactionsExpenses[day] =
          (transactionsExpenses[day] || 0) + transaction.amount;
      } else {
        transactionsProfits[day] =
          (transactionsProfits[day] || 0) + transaction.amount;
      }
    });

    for (let index of transactionsExpenses.keys()) {
      if (!transactionsExpenses[index]) {
        transactionsExpenses[index] = 0;
      }
      if (!transactionsProfits[index]) {
        transactionsProfits[index] = 0;
      }
    }

    return { transactionsExpenses, transactionsProfits };
  },
  getMonthlyData(state) {
    const monthProfits = [];
    const monthExpenses = [];

    if (!state.account.AccountMonths || !state.account.AccountMonths.length > 0)
      return { monthProfits, monthExpenses };

    state.account.AccountMonths.forEach(({ month, profit, expenses }) => {
      monthProfits[month] = profit;
      monthExpenses[month] = expenses;
    });

    for (let index of monthProfits.keys()) {
      if (!monthProfits[index]) {
        monthProfits[index] = 0;
      }

      if (!monthExpenses[index]) {
        monthExpenses[index] = 0;
      }
    }

    return { monthProfits, monthExpenses };
  },
  getAccountValues(state) {
    if (!state.account.AccountMonths || !state.account.AccountMonths.length > 0)
      return { profit: 0, expenses: 0, balance: 0 };

    const month = new Dates().getMonth();

    const accountMonth = state.account.AccountMonths.find(
      (accountMonth) => accountMonth.month === month
    );

    if (!accountMonth) return { profit: 0, expenses: 0, balance: 0 };

    return {
      profit: accountMonth.profit.toFixed(2),
      expenses: accountMonth.expenses.toFixed(2),
      balance: state.account.balance.toFixed(2),
    };
  },
  hasAccountData(state) {
    return !!state.account.AccountMonths;
  },
};

export default getters;
