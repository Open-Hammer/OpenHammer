import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import { placeBid } from "@/store/slices/bidSlice";
import Spinner from "@/layout/Spinner";
import { RiAuctionFill } from "react-icons/ri";
import notStarted from "../pages/notStarted.png";

const AuctionItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
    if (id) dispatch(getAuctionDetail(id));
  }, [isAuthenticated]);

  const handleBid = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData));
    dispatch(getAuctionDetail(id));
  };
  const isAuctionLive =
    Date.now() >= new Date(auctionDetail.startTime) &&
    Date.now() <= new Date(auctionDetail.endTime);

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 lg:px-20 mt-16">
      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-10">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* auctionDetail Image */}
            <div>
              <img
                src={auctionDetail.image?.url}
                alt={auctionDetail.title}
                className="w-full rounded-xl object-cover shadow-md"
              />
            </div>

            {/* auctionDetail Info */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-800">
                {auctionDetail.title}
              </h1>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Condition:</span>{" "}
                {auctionDetail.condition}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Starting Bid:</span> Rs.{" "}
                {auctionDetail.startingBid}
              </p>

              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Description
                </h2>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {auctionDetail.description &&
                    auctionDetail.description
                      .split(". ")
                      .map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* auctionBidders and Bid Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* auctionBidders Section */}
            <div className="bg-gray-50 rounded-xl p-4 shadow-inner">
              <h2 className="text-lg font-semibold mb-4">
                Live auctionBidders
              </h2>
              <div className="space-y-4">
                {isAuctionLive ? (
                  auctionBidders.length > 0 ? (
                    auctionBidders.map((bidder, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b pb-2"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={bidder.profileImage}
                            alt={bidder.userName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <p className="text-gray-800">{bidder.userName}</p>
                        </div>
                        <span
                          className={`text-sm font-bold ${
                            index === 0
                              ? "text-green-600"
                              : index === 1
                              ? "text-blue-500"
                              : index === 2
                              ? "text-yellow-500"
                              : "text-gray-500"
                          }`}
                        >
                          {index + 1}
                          {["st", "nd", "rd"][index] || "th"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No bids yet</p>
                  )
                ) : Date.now() < new Date(auctionDetail.startTime) ? (
                  <img
                    src={notStarted}
                    alt="Not Started"
                    className="mx-auto w-40 opacity-80"
                  />
                ) : (
                  <img
                    src={notStarted}
                    alt="Ended"
                    className="mx-auto w-40 opacity-80"
                  />
                )}
              </div>
            </div>

            {/* Bid Form */}
            <div className="bg-gray-50 rounded-xl p-4 shadow-inner">
              {isAuctionLive ? (
                <>
                  <label
                    htmlFor="bidAmount"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Enter Your Bid
                  </label>
                  <input
                    type="number"
                    id="bidAmount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min={auctionDetail.startingBid}
                    placeholder={`Min: Rs. ${auctionDetail.startingBid}`}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  />
                  <button
                    onClick={handleBid}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <RiAuctionFill size={20} />
                    Place Bid
                  </button>
                </>
              ) : Date.now() < new Date(auctionDetail.startTime) ? (
                <p className="text-yellow-600 text-center font-semibold">
                  Auctions hasn’t started yet.
                </p>
              ) : (
                <p className="text-red-600 text-center font-semibold">
                  Auctions has ended.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionItem;
