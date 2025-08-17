import React from "react";

const features = [
  {
    img: "https://cdn-icons-png.flaticon.com/128/3534/3534139.png",
    title: "Registration",
    subtitle: "Fast, Accurate, and Paperless",
    description: "Onboarding made easy",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/128/1469/1469975.png",
    title: "Consultation",
    subtitle: "Expert Doctors",
    description: "High quality care",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/128/18531/18531573.png",
    title: "Lab Services",
    subtitle: "Quick Reports",
    description: "Accurate diagnostics",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/128/7343/7343016.png",
    title: "Follow-up",
    subtitle: "Patient Tracking",
    description: "Smooth care continuity",
  },
];



export const Mid2Page = () => {
  return (
    <div className="px-6 md:px-14 py-12 bg-blue-50">
      <div className="mb-12 flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-950 leading-snug">
          Streamlined patient care from registration and
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-blue-950 mt-2">
          admission to follow-up
        </h3>
        <p className="mt-4 text-lg text-gray-700">
          Efficient, accurate, and seamless processes for better patient experience.
        </p>
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6 w-60 hover:scale-105 transition-transform duration-300"
          >
            <img src={feature.img} alt={feature.title} className="h-16 w-16 mb-4" />
            <h4 className="text-xl font-bold text-blue-900 mb-2">{feature.title}</h4>
            <p className="text-gray-700 text-center mb-1">{feature.subtitle}</p>
            <p className="text-gray-500 text-center">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
