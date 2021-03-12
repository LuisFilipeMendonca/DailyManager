import axios from "../../../util/axios";

const actions = {
  async getAccountData({ commit, rootGetters }) {
    try {
      const userId = rootGetters["auth/getUserId"];
      const date = new Date();
      const timestamps = date.getTime();

      const response = await axios(`/accounts/${userId}/${timestamps}`);

      const { balance, AccountMonths } = response.data;

      const monthlyExpenses = [];
      const monthlyProfits = [];

      AccountMonths.forEach((accountMonth) => {
        monthlyExpenses.push({
          month: accountMonth.month,
          value: accountMonth.expenses,
        });
        monthlyProfits.push({
          month: accountMonth.month,
          value: accountMonth.profit,
        });
      });

      const manipulatedData = {
        balance,
        currentMonthTransactions: AccountMonths.filter(
          (accountMonth) => accountMonth.month === date.getMonth()
        )[0].AccountTransactions,
        monthlyExpenses,
        monthlyProfits,
      };

      commit("getAccountData", manipulatedData);
    } catch (e) {
      console.log(e);
    }
  },
};

export default actions;
