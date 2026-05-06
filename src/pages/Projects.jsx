import { useState } from "react";
import projectsData from "../data/projects.json";
import employeesData from "../data/employees.json";

const Projects = () => {
  const [projects, setProjects] = useState(projectsData);
  const [showAssign, setShowAssign] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const openAssign = (project) => {
    setSelectedProject(project);
    setSelectedEmployees(project.assignedEmployees || []);
    setShowAssign(true);
  };

  const toggleEmployee = (id) => {
    setSelectedEmployees((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const saveAssignment = () => {
    setProjects((prev) =>
      prev.map((p) => (p.id === selectedProject.id ? { ...p, assignedEmployees: selectedEmployees } : p))
    );
    setShowAssign(false);
    setSelectedProject(null);
    setSelectedEmployees([]);
  };

  const getEmployeeNames = (ids) =>
    (ids || []).map((id) => employeesData.find((e) => e.id === id)?.name || "Unknown").join(", ");

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h2 className="mb-2">Projects</h2>
        <p className="text-muted">Manage and track all projects</p>
      </div>

      <div className="row">
        {projects.map((project) => (
          <div key={project.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{project.name}</h5>
                <p className="text-muted small mb-2">{project.description}</p>

                <div className="mb-2 d-flex gap-2">
                  <span className={`badge ${project.status === 'Completed' ? 'bg-success' : project.status === 'In Progress' ? 'bg-primary' : 'bg-secondary'}`}>
                    {project.status}
                  </span>
                  <span className="badge bg-info">{project.priority}</span>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <small className="text-muted">Progress</small>
                    <small className="fw-bold">{project.progress}%</small>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: `${project.progress}%` }} aria-valuenow={project.progress} aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>

                <div className="mb-2 small text-muted">Assigned: {project.assignedEmployees && project.assignedEmployees.length > 0 ? getEmployeeNames(project.assignedEmployees) : 'No employees'}</div>

                <div className="mt-auto">
                  <button className="btn btn-sm btn-outline-primary w-100" onClick={() => openAssign(project)}>Assign Employees</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Assign Modal */}
      {showAssign && selectedProject && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Assign Employees - {selectedProject.name}</h5>
                <button type="button" className="btn-close" onClick={() => setShowAssign(false)}></button>
              </div>
              <div className="modal-body">
                <div className="list-group">
                  {employeesData.map((emp) => (
                    <label key={emp.id} className="list-group-item d-flex align-items-center">
                      <input type="checkbox" className="form-check-input me-2" checked={selectedEmployees.includes(emp.id)} onChange={() => toggleEmployee(emp.id)} />
                      <div>
                        <div className="fw-bold">{emp.name}</div>
                        <div className="small text-muted">{emp.role} • {emp.email}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowAssign(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={saveAssignment}>Save Assignment</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Projects;