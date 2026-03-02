import React, { useState } from "react";
import category from "../Data/categories";
import emailjs from "@emailjs/browser";

const categoryColors = {
  Creative: "bg-pink-100 text-pink-600",
  IT: "bg-indigo-100 text-indigo-600",
  Marketing: "bg-yellow-100 text-yellow-600",
  Corporate: "bg-gray-100 text-gray-700",
  Finance: "bg-green-100 text-green-600",
  Medical: "bg-red-100 text-red-600",
  All: "bg-blue-100 text-blue-600",
};

const companyLogos = {
  "Globe Solution Ltd.": "https://preview.colorlib.com/theme/joblab/assets/img/icon/company-logo1.svg",
  "AdWorld Pvt Ltd": "https://preview.colorlib.com/theme/joblab/assets/img/icon/company-logo2.svg",
  "TechSoft": "https://preview.colorlib.com/theme/joblab/assets/img/icon/company-logo3.svg",
  "PeopleCorp": "https://preview.colorlib.com/theme/joblab/assets/img/icon/company-logo5.svg",
  "FinEdge": "https://www.svgrepo.com/show/508699/building.svg",
  "DesignPro": "https://www.svgrepo.com/show/508699/building.svg",
  "PixelCraft Studio": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
};

const JobGrid = ({ searchTitle, searchLocation, jobsData }) => {
  // console.log("JobGrid Rendered");
  const [activeCategory, setActiveCategory] = useState("All");
     const sendEmail = (job) => {
  const templateParams = {
    job_title: job.title,
    company: job.company,
    name: "Website User",
    email: "no-reply@yourwebsite.com",
    message: `Someone applied for ${job.title}`,
  };

  emailjs
    .send(
      "service_fhcugrp",
      "template_p1ewxcb",
      templateParams,
      "RJZAjPIN6Mw_xKrte"
    )
    .then(() => {
      alert("Application Sent Successfully 🚀");
    })
    .catch((error) => {
      console.log(error);
      alert("Failed to send ❌");
    });
};
  const filteredJobs = jobsData
  .filter((job) => {
    const matchesCategory =
      activeCategory === "All" || job.category === activeCategory;

    const matchesTitle = job.title
      .toLowerCase()
      .includes(searchTitle.toLowerCase());

    const matchesLocation = job.location
      .toLowerCase()
      .includes(searchLocation.toLowerCase());

    return matchesCategory && matchesTitle && matchesLocation;
  });
    

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-8">
        Find Jobs By Category
      </h2>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-6 mb-14 border-b">
        {category.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`pb-4 text-lg font-semibold transition ${
              activeCategory === cat
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Job Cards */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition border"
            >
              <span
                className={`inline-block mb-4 text-xs font-semibold px-4 py-1 rounded-full 
                ${categoryColors[job.category] || "bg-slate-100 text-slate-600"}`}
              >
                {job.category}
              </span>

              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {job.title}
              </h3>

              <div className="flex items-center text-sm text-gray-500 gap-4 mb-6">
                <span>📍 {job.location}</span>
                <span>💼 {job.type}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <img
                    src={
                      companyLogos[job.company] ||
                      "https://www.svgrepo.com/show/508699/building.svg"
                    }
                    alt={job.company}
                    className="w-6 h-6 object-contain"
                  />
                  <span className="font-semibold text-gray-700">
                    {job.company}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{job.time}</span>
              </div>

              <div className="mt-4 flex justify-end">
                <button
  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
  onClick={() => sendEmail(job)}
>
  Apply →
</button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-lg font-semibold text-gray-500">
            No jobs found 😔
          </p>
        )}
      </div>
    </section>
  );
};

export default JobGrid;