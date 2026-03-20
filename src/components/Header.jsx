import { useState, useEffect, useContext } from "react";
import { FaBars, FaTimes, FaBriefcase, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ThemeContext } from "../ThemeContext/ThemeContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setProfileOpen(false);
    setMenuOpen(false);
  };

  // ✅ Active class
  const navClass = ({ isActive }) =>
    isActive
      ? "text-blue-400 border-b-2 border-blue-400 pb-1"
      : "hover:text-blue-400";

  return (
    <>
      {/* ================= HEADER ================= */}
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

            <NavLink to="/" end className={navClass}>Home</NavLink>
            <NavLink to="/jobs" className={navClass}>Jobs</NavLink>
            <NavLink to="/companies" className={navClass}>Companies</NavLink>
            <NavLink to="/about" className={navClass}>About</NavLink>
            <NavLink to="/contact" className={navClass}>Contact</NavLink>

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="px-3 py-1 rounded text-white">
              {theme === "light" ? "☀️" : "🌙"}
            </button>

            {/* Auth */}
            {!user ? (
              <NavLink to="/login" className="text-white hover:text-blue-400">
                Login
              </NavLink>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
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

                {profileOpen && (
                  <div className="absolute right-0 mt-3 bg-white shadow-lg rounded-lg p-4 w-56">
                    <p className="text-gray-700 text-sm mb-3">
                      {user.email}
                    </p>

                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Icon */}
          <button
            className="md:hidden text-2xl text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="md:hidden bg-blue-950 px-6 py-6 space-y-4 text-gray-300 shadow-lg">

          <NavLink to="/" end onClick={() => setMenuOpen(false)} className={navClass}>
            Home
          </NavLink>

          <NavLink to="/jobs" onClick={() => setMenuOpen(false)} className={navClass}>
            Jobs
          </NavLink>

          <NavLink to="/companies" onClick={() => setMenuOpen(false)} className={navClass}>
            Companies
          </NavLink>

          <NavLink to="/about" onClick={() => setMenuOpen(false)} className={navClass}>
            About
          </NavLink>

          <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={navClass}>
            Contact
          </NavLink>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="text-white">
            {theme === "light" ? "☀️" : "🌙"}
          </button>

          {/* Auth */}
          {!user ? (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block text-white hover:text-blue-400"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="block text-left text-white hover:text-blue-400"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Header;