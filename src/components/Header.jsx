import { useState } from "react";
import { FaBars, FaTimes, FaBriefcase } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">Jobs</a>
          <a href="#" className="hover:text-blue-600">Companies</a>
          <a href="#" className="hover:text-blue-600">About</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </nav>

      

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-2xl text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col px-6 py-4 gap-4 text-gray-700">
            <a href="#">Home</a>
            <a href="#">Jobs</a>
            <a href="#">Companies</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
        
          
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
