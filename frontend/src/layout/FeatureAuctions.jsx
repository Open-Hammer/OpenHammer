import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import { toast } from "react-toastify";

const FeatureAuctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);
  if (loading) {
    return (
      <p className="text-center py-12 text-gray-500 text-lg font-medium">
        Loading auctions...
      </p>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h3 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
        Featured Auctions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {allAuctions.slice(0, 8).map((item) => (
          <Card
            key={item._id}
            title={item.title}
            imgSrc={item.image?.url}
            startTime={item.startTime}
            endTime={item.endTime}
            startingBid={item.startingBid}
            id={item._id}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureAuctions;
