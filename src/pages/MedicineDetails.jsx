import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

export default function MedicineDetails() {
  const { state } = useLocation(); // medicine object
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedId = localStorage.getItem("loggedUserId");
    const currentUser = users.find(u => u.id == loggedId);
    if (!currentUser) navigate("/");
    setUser(currentUser);
  }, []);

  if (!user) return <p>Loading...</p>;

  const deleteMedicine = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const idx = users.findIndex(u => u.id == user.id);
    users[idx].medicines = users[idx].medicines.filter(mid => mid !== state.id);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Medicine removed from your list");
    navigate("/dashboard");
  };

  return (
    <div>
      <Navbar user={user} />
      <div style={{ width: "60%", margin: "30px auto" }}>
        <h2>{state.name} Details</h2>
        <div style={styles.card}>
          <p><strong>Dosage:</strong> {state.dosage}</p>
          <p><strong>Frequency:</strong> {state.frequency}</p>
          <p><strong>Timing:</strong> {state.timing}</p>
          <p><strong>Instructions:</strong> {state.instructions}</p>
        </div>
        <button style={styles.deleteBtn} onClick={deleteMedicine}>Remove from My Medicines</button>
        <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>Back</button>
      </div>
    </div>
  );
}

const styles = {
  card: { padding: 20, border: "1px solid #ddd", borderRadius: 12, background: "#f9f9f9", marginBottom: 20 },
  deleteBtn: { padding: 10, background: "#d32f2f", color: "white", border: "none", borderRadius: 6, marginRight: 10 },
  backBtn: { padding: 10, background: "gray", color: "white", border: "none", borderRadius: 6 }
};
