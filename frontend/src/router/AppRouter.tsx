import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ClaimsList from "../pages/ClaimsList";
import ClaimDetail from "../pages/ClaimDetail";
import ProtectedLayout from "./ProtectedLayout";
// import NavBar from "../components/NavBar";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={<Dashboard key={localStorage.getItem("user")} />}
          />
          <Route path="/claims" element={<ClaimsList />} />
          <Route path="/claims/:claimNumber" element={<ClaimDetail />} />
        </Route>

        {/* Catch-all 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
