import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplyForm from "../components/ApplyForm";

// Sample jobs data (20+ jobs)
const jobsData = [
  { id: 1, title: "Senior React Developer", company: "TechVision Pvt Ltd", location: "Ahmedabad, India", salary: "₹6 - 10 LPA", type: "Full Time" },
  { id: 2, title: "Frontend Developer", company: "CodeCraft Solutions", location: "Mumbai, India", salary: "₹4 - 7 LPA", type: "Full Time" },
  { id: 3, title: "Backend Developer", company: "DataSoft Tech", location: "Bangalore, India", salary: "₹5 - 9 LPA", type: "Full Time" },
  { id: 4, title: "UI/UX Designer", company: "Creative Minds", location: "Pune, India", salary: "₹3 - 6 LPA", type: "Full Time" },
  { id: 5, title: "Full Stack Developer", company: "InnovateX", location: "Hyderabad, India", salary: "₹5 - 12 LPA", type: "Full Time" },
  { id: 6, title: "Mobile App Developer", company: "AppWorks", location: "Chennai, India", salary: "₹4 - 8 LPA", type: "Full Time" },
  { id: 7, title: "DevOps Engineer", company: "CloudTech", location: "Bangalore, India", salary: "₹6 - 11 LPA", type: "Full Time" },
  { id: 8, title: "Data Analyst", company: "DataCorp", location: "Mumbai, India", salary: "₹4 - 7 LPA", type: "Full Time" },
  { id: 9, title: "Project Manager", company: "TechVision Pvt Ltd", location: "Ahmedabad, India", salary: "₹8 - 15 LPA", type: "Full Time" },
  { id: 10, title: "QA Engineer", company: "CodeCraft Solutions", location: "Pune, India", salary: "₹3 - 6 LPA", type: "Full Time" },
  { id: 11, title: "Backend Developer", company: "InnovateX", location: "Hyderabad, India", salary: "₹5 - 9 LPA", type: "Full Time" },
  { id: 12, title: "Frontend Developer", company: "AppWorks", location: "Chennai, India", salary: "₹4 - 7 LPA", type: "Full Time" },
  { id: 13, title: "React Native Developer", company: "MobileSolutions", location: "Bangalore, India", salary: "₹5 - 10 LPA", type: "Full Time" },
  { id: 14, title: "UI Developer", company: "Creative Minds", location: "Pune, India", salary: "₹3 - 6 LPA", type: "Full Time" },
  { id: 15, title: "Backend Engineer", company: "DataSoft Tech", location: "Bangalore, India", salary: "₹5 - 9 LPA", type: "Full Time" },
  { id: 16, title: "Cloud Engineer", company: "CloudTech", location: "Hyderabad, India", salary: "₹6 - 11 LPA", type: "Full Time" },
  { id: 17, title: "Data Scientist", company: "DataCorp", location: "Mumbai, India", salary: "₹7 - 14 LPA", type: "Full Time" },
  { id: 18, title: "Software Engineer", company: "TechVision Pvt Ltd", location: "Ahmedabad, India", salary: "₹5 - 10 LPA", type: "Full Time" },
  { id: 19, title: "Frontend Developer", company: "CodeCraft Solutions", location: "Pune, India", salary: "₹4 - 7 LPA", type: "Full Time" },
  { id: 20, title: "React Developer", company: "InnovateX", location: "Hyderabad, India", salary: "₹5 - 9 LPA", type: "Full Time" },
  { id: 21, title: "Node.js Developer", company: "AppWorks", location: "Chennai, India", salary: "₹5 - 10 LPA", type: "Full Time" },
];

const JobSection = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <section className="py-10 px-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">
        All Available Jobs
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobsData.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
            <p className="text-gray-600 mb-1">{job.company}</p>
            <p className="text-gray-600 mb-1">{job.location}</p>
            <p className="font-medium mb-4">
              {job.salary} | {job.type}
            </p>

            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              onClick={() => setSelectedJob(job)}
            >
              Apply →
            </button>
          </div>
        ))}
      </div>

      {/* Apply Modal */}
      {selectedJob && (
        <ApplyForm
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </section>
  );
};

export default JobSection;