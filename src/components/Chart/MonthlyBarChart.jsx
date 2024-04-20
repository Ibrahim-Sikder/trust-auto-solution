import { BarChart } from '@mui/x-charts/BarChart';

export default function StackBars() {
  return (
    <BarChart
      series={[
        { data: [7, 8, 4, 6, 5], stack: 'A', label: 'January' },
        { data: [8, 3, 1, 5, 8], stack: 'A', label: 'February ' },
        { data: [4, 1, 3, 4, 1], stack: 'B', label: 'March' },
        { data: [2, 8, 1, 3, 1], stack: 'B', label: 'April' },
        { data: [5, 5, 5, 8, 9], label: 'May ' },
      ]}
     
      height={450}
    />
  );
}