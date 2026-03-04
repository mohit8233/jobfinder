import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaBriefcase, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setProfileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-blue-950 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <FaBriefcase className="text-blue-100 text-2xl" />
            <span className="text-2xl font-bold text-white">
              Job<span className="text-blue-600">Finder</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
            <Link to="/" className="hover:text-blue-400">Home</Link>
            <Link to="/jobs" className="hover:text-blue-400">Jobs</Link>
            <Link to="/companies" className="hover:text-blue-400">Companies</Link>
            <Link to="/about" className="hover:text-blue-400">About</Link>
            <Link to="/contact" className="hover:text-blue-400">Contact</Link>

            {!user ? (
              <Link to="/login" className="text-white hover:text-blue-400">
                Login
              </Link>
            ) : (
              <button
                onClick={() => setProfileOpen(true)}
                className="text-white text-2xl hover:text-blue-400"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <FaUserCircle />
                )}
              </button>
            )}
          </nav>

          <button
            className="md:hidden text-2xl text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* 🔥 PROFILE MODAL */}
      {profileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-xl shadow-2xl p-6 relative">

            <button
              onClick={() => setProfileOpen(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✖
            </button>

            {user && (
              <>
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                )}

                <h2 className="text-2xl font-bold text-center">
                  {user.displayName || "User"}
                </h2>

                <p className="text-center text-gray-600 mb-4">
                  {user.email}
                </p>

                <div className="bg-gray-100 p-3 rounded-lg text-sm mb-4">
                  <p><strong>User ID:</strong></p>
                  <p className="break-all">{user.uid}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;