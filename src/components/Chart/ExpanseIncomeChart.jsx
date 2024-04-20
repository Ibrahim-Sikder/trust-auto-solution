import { LineChart } from "@mui/x-charts/LineChart";

export default function ChartComponent() {
  return (
    <>
     <LineChart
  series={[
    { curve: "monotoneX", data: [0, 5, 2, 6, 3, 9.3] },
    { curve: "monotoneX", data: [6, 3, 7, 9.5, 4, 2] },
  ]}

/>
    </>
  );
}
