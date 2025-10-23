import { Outlet, Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function ProtectedLayout() {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
