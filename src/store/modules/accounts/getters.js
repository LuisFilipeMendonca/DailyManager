const getters = {
  getTransactionsExpenses(state) {
    return state.account.currentMonthTransactions.filter(
      (transaction) => transaction.type === "outcome"
    );
  },
  getTransactionsProfit(state) {
    return state.account.currentMonthTransactions.filter(
      (transaction) => transaction.type === "income"
    );
  },
};

export default getters;
