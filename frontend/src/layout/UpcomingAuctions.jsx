import React from "react";
import { useSelector } from "react-redux";
import { RiAuctionFill } from "react-icons/ri";

const UpcomingAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);

  const today = new Date();
  const todayString = today.toDateString();

  const auctionsStartingToday = allAuctions.filter((item) => {
    const auctionDate = new Date(item.startTime);
    return auctionDate.toDateString() === todayString;
  });

  const arrayforitem = [
    {
      _id: "1",
      title: "Vintage Camera",
      startingBid: 2500,
      startTime: "2025-06-06T10:00:00Z",
      image: {
        url: "https://images.unsplash.com/photo-1519183071298-a2962be96c85?auto=format&fit=crop&w=600&q=80",
      },
    },
    {
      _id: "2",
      title: "Antique Pocket Watch",
      startingBid: 3200,
      startTime: "2025-06-06T11:30:00Z",
      image: {
        url: "https://images.unsplash.com/photo-1586773860418-d37222d8f25b?auto=format&fit=crop&w=600&q=80",
      },
    },
    {
      _id: "3",
      title: "Classic Typewriter",
      startingBid: 1800,
      startTime: "2025-06-06T13:00:00Z",
      image: {
        url: "https://images.unsplash.com/photo-1588776814546-cf63cf1d5d43?auto=format&fit=crop&w=600&q=80",
      },
    },
    {
      _id: "4",
      title: "Luxury Handbag",
      startingBid: 5400,
      startTime: "2025-06-06T15:00:00Z",
      image: {
        url: "https://images.unsplash.com/photo-1600180758890-6ec2b0c95cba?auto=format&fit=crop&w=600&q=80",
      },
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 w-16 h-16 rounded-full mb-4 text-4xl mx-auto">
          <RiAuctionFill />
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Auction's Starting Today
        </h2>
        <p className="text-lg text-gray-600">Browse auctions starting today</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 cursor-pointer">
        {arrayforitem.slice(0, 4).map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105"
          >
            <img
              src={item.image?.url}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <div className="text-sm text-gray-600 flex justify-between">
                <span className="font-medium">Starting Bid:</span>
                <span className="font-bold text-blue-600">
                  Rs. {item.startingBid}
                </span>
              </div>
              <div className="text-sm text-gray-600 flex justify-between">
                <span className="font-medium">Start Time:</span>
                <span className="font-semibold">{item.startTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default UpcomingAuctions;
