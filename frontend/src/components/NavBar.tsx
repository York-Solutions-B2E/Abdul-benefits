import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="w-screen bg-gray-50 text-black py-4 px-20 flex justify-between items-center shadow-black border-b border-gray-200 transition-all ease-in-out">
      <Link to="/dashboard" className="font-bold hover:text-black">
        Benefits
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/dashboard" className="hover:text-gray-400">
          Dashboard
        </Link>
        <Link to="/claims" className="hover:text-gray-400">
          Claims
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <span className="hidden sm:inline">
          {JSON.parse(localStorage.getItem("user") || "{}")?.name || ""}
        </span>
        <button
          onClick={handleLogout}
          className="bg-transparent border hover:text-red-400  text-red-700 px-3 py-1 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
