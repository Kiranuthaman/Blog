import React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token"); // Check if user is logged in

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Remove token
    sessionStorage.removeItem("existingUsers"); // Clear user data
    navigate("/login"); // Redirect to login
  };

  return (
    <div>
      <div className="h-100 bg-gray-200">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="flex items-center justify-around" style={{ padding: "10px" }}>
            <Link to="/">
              <h1 className="text-3xl font-bold text-blue-500">Your Blog</h1>
            </Link>
            <div className="p-5 flex items-center">
              {token ? (
                // Show Profile and Logout when logged in
                <>
                  <Link to="/dashboard">
                    <button>
                      <FontAwesomeIcon icon={faUser} className="text-2xl mt-1 text-blue-500" />
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="ms-5 w-20 text-white rounded p-1 bg-blue-500 hover:bg-blue-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                // Show Login when not logged in
                <Link to="/login">
                  <button className="ms-5 w-20 text-white rounded p-1 bg-blue-500 hover:bg-blue-700">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
