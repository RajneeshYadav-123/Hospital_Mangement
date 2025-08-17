import React from "react";

export default function MapEmbed() {
  return (
    <div className="max-w-5xl mx-auto my-12 p-6 bg-white rounded-2xl shadow-lg">
      <div className="mb-4 text-center md:text-left">
        <h2 className="text-3xl font-bold text-blue-900">
          All India Institute of Medical Sciences
        </h2>
        <p className="text-gray-700 mt-1">
         Madan Mohan Malaviya University Of Technology Gorakhpur, deoria Road Gorakhpur
        </p>
      </div>

      <div className="w-full h-96 rounded-lg overflow-hidden shadow-inner">
        <iframe
          title="Hospital Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.548012271669!2d83.42133981101269!3d26.744670676650703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991458dc1c89577%3A0x20daa48eef8e6cd2!2sAll%20India%20Institute%20of%20Medical%20Sciences!5e1!3m2!1sen!2sin!4v1755091899282!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}


