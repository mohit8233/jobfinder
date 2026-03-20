import { useState, useEffect, useContext } from "react";
import { FaBars, FaTimes, FaBriefcase, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
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

            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>

            <Link to="/jobs" className="hover:text-blue-400">
              Jobs
            </Link>

            <Link to="/companies" className="hover:text-blue-400">
              Companies
            </Link>

            <Link to="/about" className="hover:text-blue-400">
              About
            </Link>

            <Link to="/contact" className="hover:text-blue-400">
              Contact
            </Link>
                 <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded"
        >
          {theme === "light" ? "☀️" : "🌙"}
        </button>

            {!user ? (

              <Link
                to="/login"
                className="text-white hover:text-blue-400"
              >
                Login
              </Link>

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

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-400"
          >
            Home
          </Link>

          <Link
            to="/jobs"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-400"
          >
            Jobs
          </Link>

          <Link
            to="/companies"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-400"
          >
            Companies
          </Link>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-400"
          >
            About
          </Link>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-400"
          >
            Contact
          </Link>

            <button onClick={toggleTheme}>
            {theme === "light" ? "☀️" : " 🌙"}
          </button>
          {!user ? (

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block text-white hover:text-blue-400"
            >
              Login
            </Link>

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