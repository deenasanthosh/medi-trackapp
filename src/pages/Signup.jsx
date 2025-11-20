import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email === form.email)) {
      setError("Email already exists");
      return;
    }

    users.push({ id: Date.now(), ...form, medicines: [] });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful!");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h2>Signup</h2>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={styles.input} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={styles.input} />
      <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} style={styles.input} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button style={styles.btn} onClick={handleSignup}>Signup</button>
      <p>Already have account? <span style={styles.link} onClick={() => navigate("/")}>Login</span></p>
    </div>
  );
}

const styles = {
  container: { width: 350, margin: "80px auto", padding: 20, border: "1px solid #ddd", borderRadius: 10, textAlign: "center" },
  input: { width: "90%", padding: 10, marginTop: 10 },
  btn: { width: "100%", padding: 10, marginTop: 20, background: "#1976d2", color: "#fff", border: "none" },
  link: { color: "blue", cursor: "pointer" }
};
