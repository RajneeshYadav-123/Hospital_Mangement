import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";


const SlideContent = ({ img, title, subtitle, desc }) => {
  const navigate = useNavigate();



  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-300 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl flex flex-col md:flex-row items-center max-w-6xl w-full overflow-hidden">
        <div className="w-full md:w-1/2">
          <img src={img} alt="Hospital" className="w-full h-full object-cover" />
        </div>

        <div className="p-8 flex flex-col items-center md:items-start text-center md:text-left space-y-4 w-full md:w-1/2">
          <h2 className="text-4xl font-bold text-blue-700">{title}</h2>
          <h3 className="text-2xl font-semibold text-gray-800 leading-snug">{subtitle}</h3>
          <p className="text-lg text-gray-600">{desc}</p>
          <button
            onClick={() => navigate("/AllAppointment")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-semibold shadow-md transition-all duration-300"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default function MidSlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      loop
      className="w-full h-full"
    >
      <SwiperSlide>
        <SlideContent
          img="https://www.shmsolutions.in/assets/images/bg/his.webp"
          title="Welcome to Healthy Hospital"
          subtitle="Future is here, Think Smart, Think Smart HMIS"
          desc="The Complete Hospital Management System"
        />
      </SwiperSlide>
      <SwiperSlide>
        <SlideContent
          img="https://www.shmsolutions.in/assets/images/bg/Paperless-hospital-management-software.webp"
          title="Advanced Medical Technology"
          subtitle="Cutting-edge tools for better care"
          desc="Experience the future of healthcare today."
        />
      </SwiperSlide>
      <SwiperSlide>
        <SlideContent
          img="https://www.shmsolutions.in/assets/images/bg/patient-management-system.gif"
          title="Caring Professionals"
          subtitle="Our team is here for you"
          desc="Compassionate care with advanced solutions."
        />
      </SwiperSlide>
      <SwiperSlide>
        <SlideContent
          img="https://shmsolutions.in/blog/wp-content/uploads/2025/05/Doctor-and-Nurse-Reviewing-Patient-Reports-in-a-Digital-Healthcare-Setting.jpg"
          title="Your Health, Our Priority"
          subtitle="Dedicated to your well-being"
          desc="Trust us for a healthier tomorrow."
        />
      </SwiperSlide>
    </Swiper>
  );
}
