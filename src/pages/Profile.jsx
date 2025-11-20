import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

export default function Profile() {
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
      <div style={{ width: "50%", margin: "30px auto" }}>
        <h2>Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}
