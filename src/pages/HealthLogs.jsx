import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

export default function HealthLogs() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedId = localStorage.getItem("loggedUserId");
    const currentUser = users.find(u => u.id == loggedId);
    setUser(currentUser);
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <Navbar user={user} />
      <h2 style={{ padding: 20 }}>Health Logs</h2>
    </div>
  );
}
