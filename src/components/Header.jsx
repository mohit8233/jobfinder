import { useState, useEffect, useContext } from "react";
import { FaBars, FaTimes, FaBriefcase, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
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

  const navClass = ({ isActive }) =>
    isActive
      ? "text-blue-400 border-b-2 border-blue-400 pb-1"
      : "hover:text-blue-400";

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 border-b shadow-sm 
bg-blue-950 text-white 
dark:bg-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <FaBriefcase className="text-2xl" />
            <span className="text-2xl font-bold">
              Work<span className="text-blue-600">Nest</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 font-medium">

            <NavLink to="/" end className={navClass}>Home</NavLink>
            <NavLink to="/jobs" className={navClass}>Jobs</NavLink>
            <NavLink to="/companies" className={navClass}>Companies</NavLink>
            <NavLink to="/about" className={navClass}>About</NavLink>
            <NavLink to="/contact" className={navClass}>Contact</NavLink>

            {/* Auth */}
            {!user ? (
              <NavLink to="/login" className="hover:text-blue-400">
                Login
              </NavLink>
            ) : (
              <div className="relative">
                <NavLink to="/dashboard" className="text-white text-2xl hover:text-blue-400">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="profile"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <FaUserCircle />
                  )}
                </NavLink>

              
              </div>
            )}


            <button
              onClick={toggleTheme}
              className="hidden md:block p-2 rounded-full bg-gray-800 text-white  transition"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

          </nav>


          <div className="flex items-center gap-3 md:hidden">


            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>


            <button
              className="text-2xl text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

          </div>
        </div>
      </header>


      {menuOpen && (
        <div className="md:hidden px-6 py-6 shadow-lg 
        bg-blue-950 text-gray-300 
        dark:bg-gray-900 dark:text-white 
        flex flex-col gap-5">


          <div className="flex flex-col gap-4 text-lg">
            <NavLink to="/" onClick={() => setMenuOpen(false)} className={navClass}>Home</NavLink>
            <NavLink to="/jobs" onClick={() => setMenuOpen(false)} className={navClass}>Jobs</NavLink>
            <NavLink to="/companies" onClick={() => setMenuOpen(false)} className={navClass}>Companies</NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)} className={navClass}>About</NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={navClass}>Contact</NavLink>
          </div>

          <div className="border-t border-gray-700"></div>

          \
          {!user ? (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-white font-semibold"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-400 font-semibold"
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