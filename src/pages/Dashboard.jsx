import KPICards from "../components/dashboard/KPICards";
import CustomLineChart from "../components/charts/LineChart";
import CustomBarChart from "../components/charts/BarChart";

const Dashboard = () => {
  return (
    <div>

      <h2 className="mb-4">Dashboard Overview</h2>

      {/* KPI Cards */}
      <KPICards />

      {/* Charts Section */}
      <div className="row mt-4">

        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h5>Weekly Productivity</h5>
            <CustomLineChart />
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h5>Task Completion</h5>
            <CustomBarChart />
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;