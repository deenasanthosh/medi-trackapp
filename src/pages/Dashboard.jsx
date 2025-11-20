import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Medications from "../data/Medications";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedId = localStorage.getItem("loggedUserId");
    const currentUser = users.find(u => u.id == loggedId);

    if (!currentUser) {
      navigate("/");
      return;
    }

    setUser(currentUser);
    const meds = Medications.map(m => ({
      ...m,
      taken: currentUser.medicines.includes(m.id)
    }));
    setMedications(meds);
  }, []);

  const toggleTaken = (id) => {
    const updated = medications.map(m => m.id === id ? { ...m, taken: !m.taken } : m);
    setMedications(updated);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const idx = users.findIndex(u => u.id == user.id);
    users[idx].medicines = updated.filter(m => m.taken).map(m => m.id);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const logout = () => {
    localStorage.removeItem("loggedUserId");
    navigate("/");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <Navbar user={user} />
      <div className="container mt-4">
        <h2>Welcome, {user.name}!</h2>
        <p>Select an option below to manage your health:</p>
        <div className="row mt-4">
          
          <div className="col-md-6 mb-4">
            <div
              className="card text-center p-4"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/medications")}
            >
              <div className="card-body">
                <h5 className="card-title">Medications</h5>
                <p className="card-text">View and manage your medication checklist</p>
                <i className="bi bi-journal-medical" style={{ fontSize: "2rem" }}></i>
              </div>
            </div>
          </div>
        <div className="col-md-6 mb-4">
            <div
              className="card text-center p-4"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/logs")}
            >
              <div className="card-body">
                <h5 className="card-title">Health Logs</h5>
                <p className="card-text">Track your health metrics and daily logs</p>
                <i className="bi bi-file-medical" style={{ fontSize: "2rem" }}></i>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
}

