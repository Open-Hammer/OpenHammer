import Spinner from "@/layout/Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);
  console.log(user);
  return (
    <section className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen mt-12">
      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={user.profileImage?.url}
              alt="User Profile"
              className="w-32 h-32 rounded-full object-cover border border-gray-300 shadow"
            />
            <div>
              <h2 className="text-2xl font-bold text-blue-700 mb-2">
                {user.userName}'s Profile
              </h2>
              <p className="text-sm text-gray-500">Role: {user.role}</p>
              <p className="text-sm text-gray-500">
                Joined on: {user.createdAt?.substring(0, 10)}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Username", value: user.userName },
                { label: "Email", value: user.email },
                { label: "Phone", value: user.phone },
                { label: "Address", value: user.address },
                { label: "Role", value: user.role },
              ].map(({ label, value }) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={value}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
              ))}
            </div>
          </div>

          {user.role === "Auctioneer" && (
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Payment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    label: "Bank Name",
                    value: user.paymentMethods.bankTransfer.bankName,
                  },
                  {
                    label: "Bank Account Number",
                    value: user.paymentMethods.bankTransfer.bankAccountNumber,
                  },
                  {
                    label: "User Name On Bank Account",
                    value: user.paymentMethods.bankTransfer.bankAccountName,
                  },
                  {
                    label: "UPI  ID",
                    value: user.paymentMethods.upiId.upiId,
                  },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {label}
                    </label>
                    <input
                      type="text"
                      value={value}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Other Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.role === "Auctioneer" && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Unpaid Commissions
                  </label>
                  <input
                    type="text"
                    value={user.unpaidCommission}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
              )}
              {user.role === "Bidder" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Auctions Won
                    </label>
                    <input
                      type="text"
                      value={user.auctionsWon}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Money Spent
                    </label>
                    <input
                      type="text"
                      value={user.moneySpent}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyProfile;
