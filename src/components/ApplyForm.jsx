import { useState } from "react";
import emailjs from "@emailjs/browser";

const ApplyForm = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      job_title: job.title,
      company: job.company,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      resume: formData.resume,
      cover_letter: formData.coverLetter,
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
        onClose();
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to send ❌");
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={sendEmail}
        className="bg-white p-6 rounded-lg w-96 space-y-3"
      >
        <h2 className="text-xl font-bold text-blue-600">Apply for {job.title}</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="w-full border p-2"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          className="w-full border p-2"
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          required
          className="w-full border p-2"
          onChange={handleChange}
        />

        <input
          type="text"
          name="resume"
          placeholder="Resume Link (Google Drive)"
          required
          className="w-full border p-2"
          onChange={handleChange}
        />

        <textarea
          name="coverLetter"
          placeholder="Cover Letter"
          required
          className="w-full border p-2"
          onChange={handleChange}
        />

        <button className="bg-blue-600  px-4 py-2 rounded w-full">
          Submit Application
        </button>

        <button
          type="button"
          onClick={onClose}
          className="text-red-500 w-full"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ApplyForm;