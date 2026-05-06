import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const EmployeeChart = ({ data }) => {
  return (
    <div style={{ width: "100%", minHeight: 300 }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="employee" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="tasks" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeeChart;