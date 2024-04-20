import { BarChart } from '@mui/x-charts/BarChart';

export default function StackBars() {
  return (
    <BarChart
      series={[
        { data: [3, 4, 4, 6, 5], stack: 'A', label: 'January' },
        { data: [4, 3, 1, 5, 8], stack: 'A', label: 'February ' },
        { data: [4, 2, 5, 4, 1], stack: 'B', label: 'March' },
        { data: [2, 8, 1, 3, 1], stack: 'B', label: 'April' },
        { data: [10, 6, 5, 8, 9], label: 'May ' },
      ]}
     
      height={450}
    />
  );
}