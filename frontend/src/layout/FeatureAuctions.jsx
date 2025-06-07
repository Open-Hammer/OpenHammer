import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

const FeatureAuctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);

  if (loading) {
    return (
      <p className="text-center py-12 text-gray-500 text-lg font-medium">
        Loading auctions...
      </p>
    );
  }

  // if (!Array.isArray(allAuctions) || allAuctions.length === 0) {
  //   return (
  //     <p className="text-center py-12 text-gray-400 italic text-lg">
  //       No featured auctions available at the moment.
  //     </p>
  //   );
  // }

  const arrayforitem = [
    {
      _id: "1",
      title: "Antique Vase",
      startingBid: 5000,
      startTime: "2025-06-10T10:00:00Z",
      endTime: "2025-06-11T10:00:00Z",
      image: { url: "https://source.unsplash.com/random/300x200?vase" },
    },
    {
      _id: "2",
      title: "Vintage Car Model",
      startingBid: 20000,
      startTime: "2025-06-12T12:00:00Z",
      endTime: "2025-06-13T12:00:00Z",
      image: { url: "https://source.unsplash.com/random/300x200?car" },
    },
    {
      _id: "3",
      title: "Rare Comic Book",
      startingBid: 3500,
      startTime: "2025-06-15T14:00:00Z",
      endTime: "2025-06-16T14:00:00Z",
      image: { url: "https://source.unsplash.com/random/300x200?comic" },
    },
    {
      _id: "4",
      title: "Classic Guitar",
      startingBid: 8000,
      startTime: "2025-06-18T16:00:00Z",
      endTime: "2025-06-19T16:00:00Z",
      image: { url: "https://source.unsplash.com/random/300x200?guitar" },
    },
    {
      _id: "5",
      title: "Painting by Raza",
      startingBid: 30000,
      startTime: "2025-06-20T18:00:00Z",
      endTime: "2025-06-21T18:00:00Z",
      image: { url: "https://source.unsplash.com/random/300x200?painting" },
    },
    {
      _id: "6",
      title: "Luxury Watch",
      startingBid: 15000,
      startTime: "2025-06-22T20:00:00Z",
      endTime: "2025-06-23T20:00:00Z",
      image: { url: "https://source.unsplash.com/random/300x200?watch" },
    },
    {
      _id: "7",
      title: "Autographed Cricket Bat",
      startingBid: 7000,
      startTime: "2025-06-24T22:00:00Z",
      endTime: "2025-06-25T22:00:00Z",
      image: { url: "https://source.unsplash.com/random/300x200?cricket" },
    },
    {
      _id: "8",
      title: "Smartphone Prototype",
      startingBid: 12000,
      startTime: "2025-06-26T23:00:00Z",
      endTime: "2025-06-27T23:00:00Z",
      image: { url: "https://source.unsplash.com/random/300x200?tech" },
    },
    {
      _id: "9",
      title: "Art Sculpture",
      startingBid: 10000,
      startTime: "2025-06-28T09:00:00Z",
      endTime: "2025-06-29T09:00:00Z",
      image: { url: "https://source.unsplash.com/random/300x200?sculpture" },
    },
    {
      _id: "10",
      title: "Luxury Handbag",
      startingBid: 25000,
      startTime: "2025-06-30T11:00:00Z",
      endTime: "2025-07-01T11:00:00Z",
      image: { url: "https://source.unsplash.com/random/300x200?bag" },
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h3 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
        Featured Auctions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {arrayforitem.slice(0, 8).map((item) => (
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
