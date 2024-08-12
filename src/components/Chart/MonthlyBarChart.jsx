/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetAllExpensesQuery } from "../../redux/api/expense";
import { useGetAllIncomesQuery } from "../../redux/api/income";
import dayjs from "dayjs";

// Helper function to group data by month
const groupByMonth = (data, key) => {
  return data.reduce((acc, curr) => {
    const month = dayjs(curr.date).format("YYYY-MM");
    if (!acc[month]) acc[month] = 0;
    acc[month] += Number(curr[key]);
    return acc;
  }, {});
};

export default function StackBars() {
  const { data: expenseData } = useGetAllExpensesQuery({
    limit: 10000,
    page: 1,
  });

  const { data: incomeData } = useGetAllIncomesQuery({
    limit: 10000,
    page: 1,
  });

  const monthlyIncome = groupByMonth(incomeData?.data?.incomes || [], "amount");
  const monthlyExpense = groupByMonth(expenseData?.data?.expenses || [], "amount");

  const months = Object.keys(monthlyIncome).concat(Object.keys(monthlyExpense)).sort();
  const data = months.map((month) => {
    const income = monthlyIncome[month] || 0;
    const expense = monthlyExpense[month] || 0;
    const profit = income - expense;
    return {
      month: dayjs(month).format("MMMM YYYY"),
      Earnings: income,
      Expense: expense,
      Profit: profit,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        barCategoryGap="15%"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Earnings" fill="#8884d8" barSize={40} />
        <Bar dataKey="Expense" fill="#82ca9d" barSize={40} />
        <Bar dataKey="Profit" fill="#ffc658" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}
