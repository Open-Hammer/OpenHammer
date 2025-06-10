import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaHandshake,
} from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Contact <span className="text-black">Open</span>
          <span className="text-orange-400">Hammer</span>
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          Have questions or need assistance? Here’s how to reach us. We’re
          committed to supporting your auction experience every step of the way.
        </p>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-700 mb-12 flex justify-center items-center gap-3">
          <FaHandshake size={30} />
          Get in Touch
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition cursor-default">
            <div className="flex items-center gap-4 mb-4 text-blue-700">
              <FaEnvelope size={30} />
              <h3 className="text-xl font-bold">Email Us</h3>
            </div>
            <p className="text-gray-700 select-all cursor-text">
              support@openhammer.com
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition cursor-default">
            <div className="flex items-center gap-4 mb-4 text-blue-700">
              <FaPhone size={30} />
              <h3 className="text-xl font-bold">Call Us</h3>
            </div>
            <p className="text-gray-700 select-all cursor-text">
              +91 9876543210
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition cursor-default">
            <div className="flex items-center gap-4 mb-4 text-blue-700">
              <FaMapMarkerAlt size={30} />
              <h3 className="text-xl font-bold">Office Location</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              MNNIT
              <br />
              Teliarganj, Allahabad
              <br />
              INDIA
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition cursor-default">
            <div className="flex items-center gap-4 mb-4 text-blue-700">
              <FaClock size={30} />
              <h3 className="text-xl font-bold">Working Hours</h3>
            </div>
            <p className="text-gray-700">
              Mon - Fri: 9:00 AM – 6:00 PM
              <br />
              <span className="italic text-gray-600 text-sm">
                Closed on Public Holidays
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
