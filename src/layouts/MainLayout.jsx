import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";


function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((open) => !open);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="flex-grow-1 d-flex flex-column" style={{ minHeight: "100vh" }}>
        <Navbar onToggleSidebar={toggleSidebar} />
        <div className="p-4 content-surface flex-grow-1" onClick={closeSidebar}>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;