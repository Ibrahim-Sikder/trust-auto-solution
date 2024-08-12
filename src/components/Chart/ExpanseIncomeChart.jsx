/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  LineChart,
  Line,
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


const groupByMonth = (data, key) => {
  return data.reduce((acc, curr) => {
    const month = dayjs(curr.date).format("YYYY-MM");
    if (!acc[month]) acc[month] = 0;
    acc[month] += Number(curr[key]);
    return acc;
  }, {});
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const income = payload.find((p) => p.dataKey === "income")?.value || 100;
    const expense = payload.find((p) => p.dataKey === "expense")?.value || 100;
    const profit = income - expense;

    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#ffff",
          padding: "10px",
          border: "1px solid #cccccc",
        }}
      >
        <p className="label">{`${label}`}</p>
        <p className="intro">{`Income: ${income}`}</p>
        <p className="intro">{`Expense: ${expense}`}</p>
        <p className="intro">{`Profit: ${profit}`}</p>
      </div>
    );
  }

  return null;
};

export default function ExpanseIncomeChart() {
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
      name: dayjs(month).format("MMMM YYYY"),
      income,
      expense,
      profit,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart data={data} margin={{ top: 5, right: 30, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#8884d8" />
        <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
        <Line type="monotone" dataKey="profit" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
}
