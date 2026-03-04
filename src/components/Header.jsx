import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaBriefcase, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  // 🔥 Firebase Auth Listener
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

          {/* Hamburger Button */}
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
        <div className="md:hidden bg-blue-950 px-6 py-4 space-y-4 text-gray-300">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">Home</Link>
          <Link to="/jobs" onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">Jobs</Link>
          <Link to="/companies" onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">Companies</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">About</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-blue-400">Contact</Link>

          {!user ? (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-white hover:text-blue-400">
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                setProfileOpen(true);
                setMenuOpen(false);
              }}
              className="block text-left text-white hover:text-blue-400"
            >
              Profile
            </button>
          )}
        </div>
      )}

      {/* ================= PROFILE MODAL ================= */}
     {menuOpen && (
  <div className="md:hidden absolute top-[72px] left-0 w-full bg-blue-950 px-6 py-6 space-y-4 text-gray-300 shadow-lg z-40">
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
        onClick={() => {
          setProfileOpen(true);
          setMenuOpen(false);
        }}
        className="block text-left text-white hover:text-blue-400"
      >
        Profile
      </button>
    )}
  </div>
)}
    </>
  );
};

export default Header;