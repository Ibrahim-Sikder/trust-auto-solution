/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";

const data1 = [
  { label: "January", value: 400 },
  { label: "February", value: 300 },
  { label: "March", value: 300 },
  { label: "April", value: 200 },
  { label: "May", value: 200 },
  { label: "June", value: 200 },
  { label: "July", value: 200 },
  { label: "August", value: 300 },
  { label: "September", value: 300 },
  { label: "October", value: 200 },
  { label: "November", value: 200 },
  { label: "December", value: 200 },
];
const data2 = [
  { value: 200 },
  { value: 200 },
  { value: 100 },
  { value: 100 },
  {  value: 100 },
  { value: 100 },
  { value: 100 },
  { value: 200 },
  { value: 200 },
  { value: 150 },
  { value: 250 },
  {  value: 200 },
];

// const data2 = [
//   { label: "20%", value: 200 },
//   { label: "30%", value: 200 },
//   { label: "50%", value: 100 },
//   { label: "60%", value: 100 },
//   { label: "100%", value: 100 },
//   { label: "10%", value: 100 },
//   { label: "90%", value: 100 },
//   { label: "80%", value: 200 },
//   { label: "60%", value: 200 },
//   { label: "88%", value: 150 },
//   { label: "94%", value: 250 },
//   { label: "90%", value: 200 },
// ];

export default function YearlyIncomeChart() {
  const [radius, setRadius] = React.useState(50);
  const [itemNb, setItemNb] = React.useState(12);
  const [skipAnimation, setSkipAnimation] = React.useState(false);

  return (
    <Box sx={{ width: "100%" }}>
      <PieChart
        height={400}
        series={[
          { data: data1, outerRadius: radius },
          {
            data: data2.slice(0, itemNb),
            innerRadius: radius,
            arcLabel: (params) => params.label ?? "",
          },
        ]}
        skipAnimation={skipAnimation}
      />
    </Box>
  );
}
