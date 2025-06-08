import Spinner from "@/layout/Spinner";
import {
  clearAllSuperAdminSliceErrors,
  getAllPaymentProofs,
  getAllUsers,
  getMonthlyRevenue,
} from "@/store/slices/superAdminSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentGraph from "./PaymentGraph";
import BiddersAuctionGraph from "./BiddersAuctionGraph";
import PaymentProofs from "./PaymentProofs";
import AuctionItemDelete from "./AuctionItemDelete";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.superAdmin);

  useEffect(() => {
    dispatch(getMonthlyRevenue());
    dispatch(getAllUsers());
    dispatch(getAllPaymentProofs());
    dispatch(clearAllSuperAdminSliceErrors());
  }, []);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || user.role !== "Super Admin") {
      navigateTo("/");
    }
  }, [isAuthenticated]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-20 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-white p-4 sm:p-6 shadow-md rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Monthly Total Payment Received
              </h3>
              <PaymentGraph />
            </div>
            <div className="bg-white p-4 sm:p-6 shadow-md rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Users</h3>
              <BiddersAuctionGraph />
            </div>
            <div className="md:col-span-2 bg-white p-4 sm:p-6 shadow-md rounded-lg overflow-x-auto">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Payment Proofs
              </h3>
              <PaymentProofs />
            </div>
            <div className="md:col-span-2 bg-white p-4 sm:p-6 shadow-md rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Delete Items From Auction
              </h3>
              <AuctionItemDelete />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
