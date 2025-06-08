import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RiAuctionFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpcomingAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const { isAuthenticated } = useSelector((state) => state.user);

  const today = new Date();
  const todayString = today.toDateString();

  const auctionsStartingToday = allAuctions.filter((item) => {
    const auctionDate = new Date(item.startTime);
    return auctionDate.toDateString() === todayString;
  });
  const navigate = useNavigate();
  const handleClick = (id) => {
    if (!isAuthenticated) {
      toast.error("Please Login First");
    } else {
      navigate(`/auction/item/${id}`);
    }
  };

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
        {auctionsStartingToday.slice(0, 4).map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105"
            onClick={() => handleClick(item._id)}
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
