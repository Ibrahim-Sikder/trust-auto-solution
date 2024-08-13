/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
import { useGetAllIncomesQuery } from "../../redux/api/income";
import dayjs from "dayjs";

export default function YearlyIncomeChart() {
  const [radius, setRadius] = React.useState(50);
  const [itemNb, setItemNb] = React.useState(12);
  const [skipAnimation, setSkipAnimation] = React.useState(false);

  const { data: incomeData } = useGetAllIncomesQuery({
    limit: 10000,
    page: 1,
  });

  // Group incomes by month
  const groupByMonth = (data) => {
    const incomeByMonth = {};
    for (const item of data) {
      const month = dayjs(item.date, "DD-MM-YYYY").format("MMMM YYYY");
      if (!incomeByMonth[month]) {
        incomeByMonth[month] = 0;
      }
      incomeByMonth[month] += Number(item.amount || 0);
    }
    return incomeByMonth;
  };
  // Create dynamic data for the chart
  const monthlyIncome = groupByMonth(incomeData?.data?.incomes || []);

  const dynamicData1 = Object.keys(monthlyIncome).map((month) => ({
    label: month,
    value: monthlyIncome[month],
  }));

  const dynamicData2 = Object.keys(monthlyIncome).map((month) => ({
    value: monthlyIncome[month] / 2, // Example: Adjust this based on your requirement
  }));

  return (
    <Box sx={{ width: "100%" }}>
      <PieChart
        height={400}
        series={[
          { data: dynamicData1, outerRadius: radius },
          {
            data: dynamicData2.slice(0, itemNb),
            innerRadius: radius,
            arcLabel: (params) => params.label ?? "",
          },
        ]}
        skipAnimation={skipAnimation}
      />
    </Box>
  );
}
