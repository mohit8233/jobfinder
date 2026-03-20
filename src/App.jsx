import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Companies from "./pages/Companies";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

import PrivateRoute from "./components/PrivateRoute";
import JobSection from "./jobSection/JobSection";
import { ThemeContext,  } from "./ThemeContext/ThemeContext";
import { useContext } from "react";

const App = () => {
  const {theme} = useContext(ThemeContext)
  return (
    <div
  className={`${
    theme === "light"
      ? "bg-white text-black"
      : "bg-gray-900 text-white"
  } min-h-screen`}
>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobSection" element={<JobSection/>} />
      </Routes>
    
    </div>
  );
};

export default App;