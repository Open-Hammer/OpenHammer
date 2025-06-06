import React from "react";
import {
  FaGavel,
  FaBolt,
  FaCrown,
  FaShieldAlt,
  FaBullseye,
  FaGlobeAmericas,
  FaTools,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const features = [
    {
      icon: <FaGavel size={30} />,
      title: "Create Auctions",
      description:
        "Easily list your items with detailed descriptions, pricing, and photos. Our tools make it fast and hassle-free.",
    },
    {
      icon: <FaBolt size={30} />,
      title: "Real-Time Bidding",
      description:
        "Experience the thrill of live bidding with instant notifications and responsive updates as auctions heat up.",
    },
    {
      icon: <FaCrown size={30} />,
      title: "Win & Buy",
      description:
        "When you win, you're guided through a seamless checkout. No delays. No confusion. Just secure payments.",
    },
    {
      icon: <FaShieldAlt size={30} />,
      title: "Safety & Transparency",
      description:
        "We ensure all transactions are secure and fair. From verification to bidding rules, integrity is our foundation.",
    },
  ];

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to OpenHammer</h1>
        <p className="text-xl max-w-3xl mx-auto">
          A powerful, real-time auction platform built for creators, collectors,
          and competitive bidders. Join a thriving digital marketplace built on
          transparency, excitement, and innovation.
        </p>
      </section>

      {/* Services Section */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-12 flex justify-center items-center gap-3">
            <FaTools size={30} />
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {features.map(({ icon, title, description }, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
              >
                <div className="flex items-center gap-4 mb-4 text-blue-700">
                  {icon}
                  <h3 className="text-xl font-bold">{title}</h3>
                </div>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-6 flex justify-center items-center gap-3">
            <FaBullseye size={30} />
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            To empower every buyer and seller with a fair, secure, and thrilling
            bidding experience. We aim to make auctions simple, accessible, and
            rewarding for everyone — anytime, anywhere.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-6 bg-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-6 flex justify-center items-center gap-3">
            <FaGlobeAmericas size={30} />
            Our Vision
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            To become the go-to global platform for digital auctions — where
            trust, innovation, and community drive value creation. We envision a
            space where every bid builds opportunity.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 text-center bg-white">
        <h3 className="text-3xl font-semibold text-gray-800 mb-4">
          Join the Future of Auctions Today
        </h3>
        <p className="text-gray-600 mb-8">
          Whether you’re a collector, creator, or casual browser, OpenHammer
          gives you the tools to engage and win with confidence.
        </p>
        <Link
          to="/sign-up"
          className="inline-block bg-blue-700 text-white text-lg font-medium px-8 py-3 rounded-full hover:bg-blue-800 transition"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
