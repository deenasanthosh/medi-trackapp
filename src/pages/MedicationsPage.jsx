import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Medications from "../data/Medications";

export default function MedicationsPage() {
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

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <Navbar user={user} />
      <div className="container mt-4">
        <h2>Your Medications</h2>
        <div className="row">
          {medications.map(m => (
            <div className="col-md-4 mb-3" key={m.id}>
              <div className="card p-3">
                <h5 style={{ cursor: "pointer" }} onClick={() => navigate(`/medicine/${m.id}`, { state: m })}>{m.name}</h5>
                <p>{m.dosage}</p>
                <button className={`btn ${m.taken ? 'btn-success' : 'btn-primary'}`} onClick={() => toggleTaken(m.id)}>
                  {m.taken ? "Taken ✔" : "Mark as Taken"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

