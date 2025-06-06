import FeatureAuctions from "@/layout/FeatureAuctions";
import Leaderboard from "@/layout/Leaderboard";
import Spinner from "@/layout/Spinner";
import UpcomingAuctions from "@/layout/UpcomingAuctions";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const howItWorks = [
    {
      title: "Post Items",
      description:
        "Sellers list products for auction with details and starting prices.",
    },
    {
      title: "Place Bids",
      description:
        "Buyers compete by placing higher bids before the auction ends.",
    },
    {
      title: "Win Notification",
      description:
        "Winners are notified instantly via email after the auction closes.",
    },
    {
      title: "Payment & Fees",
      description:
        "Winning bidder completes payment; seller pays a 5% platform commission.",
    },
  ];
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-24 px-6 text-center rounded-b-3xl shadow-lg">
        <p className="text-xl font-semibold mb-2 opacity-90 text-orange-300">
          Discover True Value in Every Bid
        </p>
        <h1 className="text-6xl font-extrabold mb-3 leading-tight drop-shadow-lg text-black">
          Where Every Bid Counts
        </h1>
        <h2 className="text-5xl font-extrabold mb-8 drop-shadow-lg">
          Become the <span className="text-orange-400">Ultimate</span> Auction
          Champion
        </h2>
        <div className="space-x-6">
          {!isAuthenticated && (
            <>
              <Link
                to="/sign-up"
                className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow hover:bg-gray-100 transition"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="inline-block border border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-4xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
          How it Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {howItWorks.map(({ title, description }, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition cursor-default"
            >
              <h4 className="text-2xl font-semibold mb-4 text-blue-600">
                {title}
              </h4>
              <p className="text-gray-700">{description}</p>
            </div>
          ))}
        </div>
      </div>
      <FeatureAuctions />
      <UpcomingAuctions />
      <Leaderboard />
    </section>
  );
};

export default Home;
