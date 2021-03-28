const mutations = {
  getAccountData(state, payload) {
    state.account = payload;
  },
  addTransaction(state, payload) {
    const accountMonth = payload.accountMonth[0];
    const accountTransaction = payload.accountTransaction;

    const monthIdx = state.account.AccountMonths.findIndex(
      (month) => month.id === accountMonth.id
    );

    if (monthIdx !== -1) {
      state.account.AccountMonths[monthIdx] = {
        ...state.account.AccountMonths[monthIdx],
        ...accountMonth,
        AccountTransactions: [
          ...state.account.AccountMonths[monthIdx].AccountTransactions,
          accountTransaction,
        ],
      };
    } else {
      state.account.AccountMonths.push({
        ...accountMonth,
        AccountTransactions: [accountTransaction],
      });
    }

    state.account.balance =
      accountTransaction.type === "income"
        ? state.account.balance + accountTransaction.amount
        : state.account.balance - accountTransaction.amount;
  },
};

export default mutations;
