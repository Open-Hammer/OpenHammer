import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import Spinner from "@/layout/Spinner";
import notStarted from "../pages/notStarted.png";
import { FaGavel } from "react-icons/fa";

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") navigate("/");
     if(id) dispatch(getAuctionDetail(id));
  }, [isAuthenticated]);
  console.log(auctionBidders, typeof auctionBidders);
  console.log(auctionDetail, typeof auctionDetail);
  const isAuctionLive =
    Date.now() >= new Date(auctionDetail.startTime) &&
    Date.now() <= new Date(auctionDetail.endTime);
  console.log(auctionDetail.description, typeof auctionDetail.description);
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 lg:px-20 mt-16">
      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={auctionDetail.image?.url}
                alt={auctionDetail.title}
                className="w-full rounded-xl object-cover shadow-md"
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-800">
                {auctionDetail.title}
              </h1>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Condition:</span>{" "}
                {auctionDetail.condition}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Starting Bid:</span> ₹
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

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 w-full">
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
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-3"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <img
                            src={bidder.profileImage}
                            alt={bidder.userName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <p className="text-gray-800 font-medium">
                            {bidder.userName}
                          </p>
                        </div>

                        <p className="text-sm font-semibold text-gray-700 flex-1">
                          ₹{bidder.amount.toLocaleString()}
                        </p>

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
                  <div className="flex flex-col items-center justify-center text-center text-gray-600 py-10">
                    <FaGavel className="text-6xl text-red-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      This auction has ended
                    </h3>
                    <p className="text-sm text-gray-500">
                      Thank you for participating. Stay tuned for more exciting
                      items!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAuctionDetails;
