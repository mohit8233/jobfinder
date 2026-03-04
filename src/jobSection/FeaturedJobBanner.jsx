import React from "react";
import { useNavigate } from "react-router-dom";

const ModernJobBanner = () => {

  const navigate = useNavigate(); // navigation hook

  const goToJobs = () => {
    navigate("/jobSection"); // ye route tumhare JobSection page ka hona chahiye
  };

  return (
    <section className="relative bg-gradient-to-r from-purple-600 to-pink-500 text-white py-32 px-6 overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white opacity-10 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white opacity-10 rounded-full animate-pulse"></div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        {/* Left: Job Info */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-yellow-400 text-gray-900 font-bold px-4 py-1 rounded-full uppercase tracking-wide text-sm">
              Hot Job
            </span>
            <img
              src="https://img.icons8.com/?size=96&id=by7K6EO4PeHT&format=png"
              alt="Company Logo"
              className="w-16 h-16 object-cover rounded-full shadow-md"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight">
            Lead Frontend Developer
          </h1>

          <p className="text-lg md:text-xl mb-2">
            CodeCraft Solutions | Bangalore, India
          </p>

          <p className="font-semibold text-lg md:text-xl mb-6">
            ₹8 - 14 LPA | Full Time
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-3 mb-6">
            {["React.js", "Next.js", "Tailwind CSS", "TypeScript"].map(skill => (
              <span
                key={skill}
                className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 flex-wrap">
            <button className="bg-white text-pink-500 font-bold px-8 py-3 rounded-lg hover:scale-105 transform transition duration-300"   onClick={goToJobs}>
              Apply Now
            </button>
            <button className="bg-transparent border border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white hover:text-pink-500 transition" 
            onClick={goToJobs}>
              Save Job
            </button>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="flex-1 relative">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY2q3YcFZs8fkRd-BmlhQVTG71-PPyaqPHlg&s"
            alt="Job Illustration"
            className="rounded-3xl shadow-2xl w-full h-[100%] object-cover hover:scale-105 transform transition duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default ModernJobBanner;