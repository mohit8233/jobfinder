import React, { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "JobFinder has completely transformed our hiring process. The platform is fast, reliable, and connects us with top-quality candidates effortlessly.",
    name: "Rahul Mehta",
    role: "HR Manager, TechVision Pvt Ltd",
  },
  {
    id: 2,
    quote:
      "We were able to fill multiple positions within weeks thanks to JobFinder. The user experience is smooth and extremely professional.",
    name: "Sneha Kapoor",
    role: "Talent Acquisition Lead, CodeCraft",
  },
  {
    id: 3,
    quote:
      "JobFinder stands out from other platforms. It is simple, powerful, and truly designed for modern recruitment needs.",
    name: "Amit Sharma",
    role: "CEO, InnovateX Solutions",
  },
];

const ClientQuote = () => {
  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
  };

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-4xl mx-auto px-6 text-center relative">

        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          What Our Clients Say
        </h2>

        <div className="bg-white p-10 rounded-2xl shadow-lg transition duration-500">
          <div className="text-5xl text-blue-600 opacity-20 mb-4">“</div>

          <p className="text-lg text-gray-600 leading-relaxed">
            {testimonials[current].quote}
          </p>

          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-800">
              {testimonials[current].name}
            </h4>
            <p className="text-sm text-gray-500">
              {testimonials[current].role}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={prevSlide}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Prev
          </button>

          <button
            onClick={nextSlide}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>

      </div>
    </section>
  );
};

export default ClientQuote;