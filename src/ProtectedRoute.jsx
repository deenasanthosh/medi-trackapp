import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const loggedUserId = localStorage.getItem("loggedUserId");
  if (!loggedUserId) return <Navigate to="/" />;
  return children;
}