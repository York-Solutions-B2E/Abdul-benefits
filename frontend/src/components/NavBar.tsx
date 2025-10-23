import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="w-screen bg-green-300 text-black p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/dashboard" className="font-bold hover:text-black">
          Benefits
        </Link>
        <Link to="/dashboard" className="hover:text-black">
          Dashboard
        </Link>
        <Link to="/claims" className="hover:text-black">
          Claims
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <span className="hidden sm:inline">
          {JSON.parse(localStorage.getItem("user") || "{}")?.name || ""}
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
