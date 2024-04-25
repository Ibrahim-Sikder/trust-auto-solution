import { LineChart } from "@mui/x-charts/LineChart";

export default function ChartComponent() {
  return (
    <>
      <LineChart
        series={[
          { curve: "monotoneX", data: [0, 2, 2, 6, 3, 9.3] },
          { curve: "monotoneX", data: [6, 3, 7, 9.5, 4, 2] },
          { curve: "monotoneX", data: [7, 5, 3, 5, 3, 1] },
        ]}
      />
    </>
  );
}
