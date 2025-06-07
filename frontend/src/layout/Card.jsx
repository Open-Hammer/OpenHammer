import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDiff = new Date(startTime) - now;
    const endDiff = new Date(endTime) - now;

    if (startDiff > 0) {
      return {
        type: "Starts In",
        days: Math.floor(startDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDiff / (1000 * 60)) % 60),
        seconds: Math.floor((startDiff / 1000) % 60),
      };
    } else if (endDiff > 0) {
      return {
        type: "Ends In",
        days: Math.floor(endDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDiff / (1000 * 60)) % 60),
        seconds: Math.floor((endDiff / 1000) % 60),
      };
    } else {
      return null;
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, endTime]);

  const formatTime = ({ days, hours, minutes, seconds }) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${days}days ${pad(hours)}hour:${pad(minutes)}min:${pad(
      seconds
    )}sec`;
  };

  return (
    <Link
      to={`/auction/item/${id}`}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
    >
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img
          src={imgSrc || "/placeholder.png"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h4
          className="font-semibold text-lg text-gray-900 mb-2 truncate"
          title={title}
        >
          {title}
        </h4>
        {startingBid && (
          <p className="text-blue-600 font-semibold mb-2">
            Starting Bid: ₹{startingBid.toLocaleString()}
          </p>
        )}
        {timeLeft ? (
          <p className="text-sm text-gray-700 font-medium">
            {timeLeft.type}:{" "}
            <span className="font-mono text-red-600">
              {formatTime(timeLeft)}
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-500 font-semibold">Auction ended</p>
        )}
      </div>
    </Link>
  );
};

export default Card;
