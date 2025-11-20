import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("loggedUserId", user.id);
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={styles.input} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={styles.input} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button style={styles.btn} onClick={handleLogin}>Login</button>
      <p>New user? <span style={styles.link} onClick={() => navigate("/signup")}>Signup</span></p>
    </div>
  );
}

const styles = {
  container: { width: 350, margin: "80px auto", padding: 20, border: "1px solid #ddd", borderRadius: 10, textAlign: "center" },
  input: { width: "90%", padding: 10, marginTop: 10 },
  btn: { width: "100%", padding: 10, marginTop: 20, background: "#1976d2", color: "#fff", border: "none" },
  link: { color: "blue", cursor: "pointer" }
};
