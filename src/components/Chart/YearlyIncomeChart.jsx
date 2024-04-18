/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';

const data1 = [
  { label: 'Group A', value: 400 },
  { label: 'Group B', value: 300 },
  { label: 'Group C', value: 300 },
  { label: 'Group D', value: 200 },
];

const data2 = [
  { label: '1', value: 100 },
  { label: '2', value: 300 },
  { label: '3', value: 100 },
  { label: '4', value: 80 },
  { label: '5', value: 40 },
  { label: '6', value: 30 },
  { label: '7', value: 50 },
  { label: '8', value: 100 },
  { label: '9', value: 200 },
  { label: '10', value: 150 },
  { label: '11', value: 50 },
];

export default function YearlyIncomeChart() {
  const [radius, setRadius] = React.useState(50);
  const [itemNb, setItemNb] = React.useState(5);
  const [skipAnimation, setSkipAnimation] = React.useState(false);


  return (
    <Box sx={{ width: '100%' }}>
      <PieChart
        height={300}
        series={[
          { data: data1, outerRadius: radius },
          {
            data: data2.slice(0, itemNb),
            innerRadius: radius,
            arcLabel: (params) => params.label ?? '',
          },
        ]}
        skipAnimation={skipAnimation}
      />
     
      <h3 className="text-3xl font-semibold">Yearly Income</h3>
      
    </Box>
  );
}
