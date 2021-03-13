import { months } from "../../../constants/dates";

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
    const monthlyProfits = state.account.monthlyProfits;

    if (!monthlyProfits) return;

    const transformedData = monthlyProfits.map((profit) => ({
      date: months[profit.month].slice(0, 3),
      amount: profit.value,
      tooltips: [{ description: months[profit.month], amount: profit.value }],
    }));

    return transformedData;
  },
  getMonthlyExpenses(state) {
    const monthlyExpenses = state.account.monthlyExpenses;

    if (!monthlyExpenses) return;

    const transformedData = monthlyExpenses.map((expense) => ({
      date: months[expense.month].slice(0, 3),
      amount: expense.value,
      tooltips: [
        {
          description: months[expense.month],
          amount: expense.value,
        },
      ],
    }));

    return transformedData;
  },
};

export default getters;
