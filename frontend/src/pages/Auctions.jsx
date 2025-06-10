import React from "react";
import { useSelector } from "react-redux";
import Card from "@/layout/Card";
import Spinner from "@/layout/Spinner";

const Auctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);

  if (loading) {
    return <Spinner />;
  }
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 mt-16">
      <h3 className="text-5xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
        All Auctions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {allAuctions.map((item) => (
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

export default Auctions;
