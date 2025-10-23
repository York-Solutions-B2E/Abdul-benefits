import { Outlet, Navigate } from "react-router-dom";
import NavBar from "./NavBar";

export default function ayout() {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
