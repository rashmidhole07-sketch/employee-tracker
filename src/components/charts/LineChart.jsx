import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", productivity: 40 },
  { day: "Tue", productivity: 55 },
  { day: "Wed", productivity: 60 },
  { day: "Thu", productivity: 50 },
  { day: "Fri", productivity: 70 },
];

const CustomLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="productivity" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;