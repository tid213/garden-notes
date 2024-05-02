import { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center h-10 w-10 bg-gray-300 rounded-full focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
          <div className="py-1">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Home
            </Link>
            <Link
              to="/signin"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Sign Up
            </Link>
            <Link
              to="/forgotpassword"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Forgot Password
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
