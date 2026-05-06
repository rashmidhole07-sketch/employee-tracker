import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";

const Reports = () => {
  const [report, setReport] = useState({
    totalHours: 0,
    completedTasks: 0,
    presentDays: 0,
    productivity: 0,
  });

  useEffect(() => {
    // Time Logs
    const logs = JSON.parse(localStorage.getItem("timeLogs")) || [];
    const totalSeconds = logs.reduce((sum, log) => sum + log.duration, 0);
    const totalHours = totalSeconds / 3600;

    // Tasks
    const tasks = getTasks();
    const completedTasks = tasks.filter(
      (t) => t.status === "Completed"
    ).length;

    // Attendance
    const attendance = JSON.parse(localStorage.getItem("attendance")) || {};
    const presentDays = Object.values(attendance).filter(
      (s) => s === "Present"
    ).length;

    // Productivity
    const productivity =
      totalHours > 0 ? (completedTasks / totalHours).toFixed(2) : 0;

    setReport({
      totalHours: totalHours.toFixed(2),
      completedTasks,
      presentDays,
      productivity,
    });
  }, []);

  // CSV Download
  const downloadCSV = () => {
    const data = [
      ["Metric", "Value"],
      ["Total Hours", report.totalHours],
      ["Tasks Completed", report.completedTasks],
      ["Present Days", report.presentDays],
      ["Productivity Score", report.productivity],
    ];

    const csv = data.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "report.csv";
    link.click();
  };

  // PDF Download directly via Blob
  const downloadPDF = () => {
    const sanitize = (text) =>
      String(text)
        .replace(/\\/g, "\\\\")
        .replace(/\(/g, "\\(")
        .replace(/\)/g, "\\)");

    const lines = [
      `Employee Productivity Report`,
      `Generated: ${new Date().toLocaleString()}`,
      "",
      `Total Hours: ${report.totalHours}`,
      `Tasks Completed: ${report.completedTasks}`,
      `Present Days: ${report.presentDays}`,
      `Productivity Score: ${report.productivity}`,
    ];

    const content = lines
      .map((line, index) => {
        const y = 760 - index * 20;
        return `BT /F1 12 Tf 50 ${y} Td (${sanitize(line)}) Tj ET\n`;
      })
      .join("");

    const encoder = new TextEncoder();
    const contentBytes = encoder.encode(content);
    const objects = [
      `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`,
      `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`,
      `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`,
      `4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`,
      `5 0 obj\n<< /Length ${contentBytes.length} >>\nstream\n${content}endstream\nendobj\n`,
    ];

    let offset = 0;
    const offsets = [0];
    const pdfPrefix = "%PDF-1.3\n";
    offset += encoder.encode(pdfPrefix).length;

    objects.forEach((obj) => {
      offsets.push(offset);
      offset += encoder.encode(obj).length;
    });

    let pdf = pdfPrefix;
    objects.forEach((obj) => {
      pdf += obj;
    });

    const xrefStart = encoder.encode(pdf).length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (let i = 1; i <= objects.length; i += 1) {
      pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
    }
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

    const blob = new Blob([pdf], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.pdf";
    link.click();
  };

  return (
    <div>

      <h2 className="mb-4">Reports & Insights</h2>

      {/* KPI Cards */}
      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Total Hours</h6>
            <h4>{report.totalHours}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Tasks Completed</h6>
            <h4>{report.completedTasks}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Present Days</h6>
            <h4>{report.presentDays}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm bg-success text-white">
            <h6>Productivity</h6>
            <h4>{report.productivity}</h4>
          </div>
        </div>

      </div>

      {/* Download Section */}
      <div className="card p-3 shadow-sm mb-4">
        <h5>Download Reports</h5>
        <button className="btn download-report-btn mt-2 me-2" onClick={downloadCSV}>
          Download CSV Report
        </button>
        <button className="btn download-report-btn mt-2" onClick={downloadPDF}>
          Download PDF Report
        </button>
      </div>

      {/* Detailed Sections */}
      <div className="row">

        {/* Employee Report */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm mb-3">
            <h5>Employee Performance</h5>
            <ul>
              <li>Total Tasks Completed: {report.completedTasks}</li>
              <li>Average Productivity: {report.productivity}</li>
            </ul>
          </div>
        </div>

        {/* Time Report */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm mb-3">
            <h5>Time Tracking Summary</h5>
            <ul>
              <li>Total Hours Worked: {report.totalHours}</li>
              <li>Days Present: {report.presentDays}</li>
            </ul>
          </div>
        </div>

      </div>

      {/* Table Summary */}
      <div className="card p-3 shadow-sm mt-3">

        <h5>Report Summary</h5>

        <div className="table-responsive">
          <table className="table table-bordered mt-2">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Total Hours</td>
              <td>{report.totalHours}</td>
            </tr>
            <tr>
              <td>Tasks Completed</td>
              <td>{report.completedTasks}</td>
            </tr>
            <tr>
              <td>Present Days</td>
              <td>{report.presentDays}</td>
            </tr>
            <tr>
              <td>Productivity Score</td>
              <td>{report.productivity}</td>
            </tr>
          </tbody>

          </table>
        </div>

      </div>

    </div>
  );
};

export default Reports;