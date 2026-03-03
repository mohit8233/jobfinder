import React from "react";

const stats = [
  { id: 1, title: "Active Jobs", value: "500+" },
  { id: 2, title: "Companies", value: "120+" },
  { id: 3, title: "Candidates", value: "10k+" },
  { id: 4, title: "Hiring Success", value: "95%" },
];

const JobStats = () => {
  return (
    <section className="py-20 bg-white px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.id} className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h3 className="text-3xl font-bold text-blue-600">{s.value}</h3>
            <p className="text-gray-700 mt-2">{s.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JobStats;