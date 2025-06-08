import { deleteAuction, republishAuction } from "@/store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CardTwo = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDiff = new Date(startTime) - now;
    const endDiff = new Date(endTime) - now;

    if (startDiff > 0) {
      return { type: "Starts In", diff: startDiff };
    } else if (endDiff > 0) {
      return { type: "Ends In", diff: endDiff };
    }
    return null;
  };
  const [openDrawer, setOpenDrawer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime, endTime]);

  const formatTime = (ms) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${days}d ${String(hours).padStart(2, "0")}h:${String(
      minutes
    ).padStart(2, "0")}m:${String(seconds).padStart(2, "0")}s`;
  };
  const dispatch = useDispatch();
  const handleDeleteAuction = () => {
    dispatch(deleteAuction(id));
  };

  return (
    <>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-200 flex flex-col ">
        <Link to={`/auction/details/${id}`} className="block">
          <div className="h-52 bg-gray-100 overflow-hidden">
            <img
              src={imgSrc || "/placeholder.png"}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>

        <div className="p-4 flex flex-col justify-between flex-1">
          <div className="flex-grow space-y-2">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-blue-600 font-semibold">
              Starting Bid: ₹{startingBid?.toLocaleString()}
            </p>

            {timeLeft ? (
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-gray-800">
                  {timeLeft.type}:
                </span>{" "}
                <span className="font-mono text-orange-500">
                  {formatTime(timeLeft.diff)}
                </span>
              </p>
            ) : (
              <p className="text-sm font-medium text-red-500">Auction Ended</p>
            )}
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <Link
              to={`/auction/details/${id}`}
              className="text-sm text-white bg-blue-600 hover:bg-blue-700 font-semibold py-2 rounded-md text-center transition"
            >
              View Auction
            </Link>

            <button
              onClick={handleDeleteAuction}
              className="text-sm text-red-600 border border-red-600 hover:bg-red-600 hover:text-white font-semibold py-2 rounded-md transition"
            >
              Delete Auction
            </button>

            <button
              disabled={new Date(endTime) > Date.now()}
              onClick={() => setOpenDrawer(true)}
              className={`text-sm font-semibold py-2 rounded-md transition ${
                new Date(endTime) > Date.now()
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              Republish Auction
            </button>
          </div>
        </div>
      </div>
      <Drawer id={id} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
};

export default CardTwo;
const Drawer = ({ openDrawer, setOpenDrawer, id }) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { loading } = useSelector((state) => state.auction);
  const handleRepublishAuction = () => {
    const formData = new FormData();
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    console.log("Republishing auction", id, startTime, endTime);
    dispatch(republishAuction(id, formData));
    setOpenDrawer(false);
  };

  return (
    <>
      {openDrawer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setOpenDrawer(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-blue-200 shadow-lg z-50 transform transition-transform duration-300 ease-in-out  ${
          openDrawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Republish Auction
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Set new start and end times to republish this auction.
            </p>

            <form className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Republish Start Time
                </label>
                <DatePicker
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={10}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  placeholderText="Select start time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Republish End Time
                </label>
                <DatePicker
                  selected={endTime}
                  onChange={(date) => setEndTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={10}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  placeholderText="Select end time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <button
              onClick={() => setOpenDrawer(false)}
              className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleRepublishAuction}
              className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition"
            >
              {loading ? "Republishing..." : "Republish"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
