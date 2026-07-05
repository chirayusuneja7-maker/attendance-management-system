import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

function Navbar({ logout }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar navbar-dark bg-dark rounded mb-4 px-4">
      <h3 className="text-white mb-0">
        Attendance Management System
      </h3>

      <div className="d-flex align-items-center">
        <FaUserCircle className="text-white me-2" size={24} />

        <span className="text-white me-4">
          {user?.name || "Student"}
        </span>

        <button className="btn btn-danger" onClick={logout}>
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;