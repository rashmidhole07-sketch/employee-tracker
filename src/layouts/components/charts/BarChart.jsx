import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "John", tasks: 5 },
  { name: "Jane", tasks: 8 },
  { name: "Mike", tasks: 6 },
];

const CustomBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="tasks" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;