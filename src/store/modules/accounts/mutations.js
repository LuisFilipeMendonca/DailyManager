const mutations = {
  getAccountData(state, payload) {
    state.account = payload;
  },
  addTransaction(state, payload) {
    const { type, amount, transactionDate } = payload;

    const transactionMonth = new Date(transactionDate).getMonth();
    const currentMonth = new Date().getMonth();

    state.account.balance =
      type === "income"
        ? state.account.balance + amount
        : state.account.balance - amount;

    const transactionMonthIdx = state.account.AccountMonths.findIndex(
      (accountMonth) => accountMonth.month === transactionMonth
    );

    if (currentMonth === transactionMonth) {
      state.account.AccountMonths[transactionMonthIdx].AccountTransactions.push(
        payload
      );
    }

    if (type === "income") {
      state.account.AccountMonths[transactionMonthIdx].profit += amount;
    } else {
      state.account.AccountMonths[transactionMonthIdx].expenses += amount;
    }
  },
};

export default mutations;
