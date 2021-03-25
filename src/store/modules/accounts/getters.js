// import { months } from "../../../constants/dates";

const getters = {
  getTransactionsExpenses(state) {
    if (!state.account.AccountMonths) return null;

    const { AccountTransactions } = state.account.AccountMonths.find(
      (accountMonth) => accountMonth.AccountTransactions.length !== 0
    );

    let transactionsExpenses = [];

    AccountTransactions.forEach((transaction) => {
      if (transaction.type === "outcome") {
        const day =
          +transaction.createdAt.slice(transaction.createdAt.length - 2) - 1;
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
    if (!state.account.AccountMonths) return null;

    const { AccountTransactions } = state.account.AccountMonths.find(
      (accountMonth) => accountMonth.AccountTransactions.length !== 0
    );

    let transactionsProfits = [];

    AccountTransactions.forEach((transaction) => {
      if (transaction.type === "income") {
        const day = transaction.createdAt.slice(
          transaction.createdAt.length - 2
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
