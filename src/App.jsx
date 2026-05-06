import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import EmployeeProfile from "./pages/EmployeeProfile";
import TimeTracker from "./pages/TimeTracker";
import Timesheet from "./pages/Timesheet";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import Projects from "./pages/Projects";
import Attendance from "./pages/Attendance";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Roles from "./pages/Roles";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <Router>
  <Routes>

    <Route path="/" element={<AuthLayout><Login /></AuthLayout>} />

    <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
    <Route path="/employees" element={<MainLayout><Employees /></MainLayout>} />
    <Route path="/employee/:id" element={<MainLayout><EmployeeProfile /></MainLayout>} />
    <Route path="/tracker" element={<MainLayout><TimeTracker /></MainLayout>} />
    <Route path="/timesheet" element={<MainLayout><Timesheet /></MainLayout>} />
    <Route path="/tasks" element={<MainLayout><Tasks /></MainLayout>} />
    <Route path="/task/:id" element={<MainLayout><TaskDetails /></MainLayout>} />
    <Route path="/projects" element={<MainLayout><Projects /></MainLayout>} />
    <Route path="/attendance" element={<MainLayout><Attendance /></MainLayout>} />
    <Route path="/analytics" element={<MainLayout><Analytics /></MainLayout>} />
    <Route path="/reports" element={<MainLayout><Reports /></MainLayout>} />
    <Route path="/notifications" element={<MainLayout><Notifications /></MainLayout>} />
    <Route path="/roles" element={<MainLayout><Roles /></MainLayout>} />
    <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
    <Route path="/help" element={<MainLayout><Help /></MainLayout>} />

    <Route path="*" element={<NotFound />} />

  </Routes>
  <ToastContainer />
</Router>
    
  );
}

export default App;