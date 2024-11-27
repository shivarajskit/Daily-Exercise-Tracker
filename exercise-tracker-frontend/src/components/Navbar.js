import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to Login
  };

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/history" className="hover:underline">
            History
          </Link>
          <Link to="/analytics" className="hover:underline">
            Analytics
          </Link>
        </div>
        <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;