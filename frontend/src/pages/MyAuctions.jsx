import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardTwo from "@/layout/CardTwo";
import Spinner from "@/layout/Spinner";
import { getMyActionItems } from "@/store/slices/auctionSlice";

const MyAuctions = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigate("/");
    }
    dispatch(getMyActionItems());
  }, [dispatch, isAuthenticated]);

  return (
    <section className="min-h-screen py-16 px-6 mt-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-black mb-12">
          My Auctions
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : myAuctions.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            No auctions found. Start listing to attract bidders!
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
            {myAuctions.map((item) => (
              <CardTwo
                key={item._id}
                title={item.title}
                startingBid={item.startingBid}
                startTime={item.startTime}
                endTime={item.endTime}
                imgSrc={item.image?.url}
                id={item._id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAuctions;
