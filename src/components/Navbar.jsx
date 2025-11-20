import { useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
      <div className="container-fluid">
        <span className="navbar-brand" 
        style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
          MedTrack
        </span>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav"style={{ cursor: "pointer" }}>
            <li className="nav-item"><span className="nav-link" onClick={() => navigate("/dashboard")}>Dashboard</span></li>

            <li className="nav-item"><span className="nav-link" onClick={() => navigate("/logs")}>Health Logs</span></li>

            <li className="nav-item"><span className="nav-link" onClick={() => navigate("/alerts")}>Alerts</span></li>

            
            <li className="nav-item">
              <span className="nav-link" onClick={() => navigate("/medications")}>Medications</span>
            </li>
            
            <li className="nav-item"><span className="nav-link" onClick={() => navigate("/profile")}>Profile</span></li>

          </ul>
          <span className="text-white fw-bold">Hello, {user?.name}</span>
        </div>
      </div>
    </nav>
  );
}
