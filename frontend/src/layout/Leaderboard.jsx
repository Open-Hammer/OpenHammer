import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { fetchLeaderboard } from "@/store/slices/userSlice";

const Leaderboard = () => {
  const { leaderboard, loading } = useSelector((state) => state.user);
  console.log(leaderboard, typeof leaderboard);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);
  return (
    <section className="max-w-7xl mx-auto p-6 mt-20">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="text-center mb-10">
            <h3 className="text-4xl font-semibold text-black">
              Bidder's{" "}
              <span className="text-yellow-300 text-5xl">LeaderBoard</span>
            </h3>
          </div>

          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-6 py-4">Profile Pic</th>
                  <th className="px-6 py-4">User Name</th>
                  <th className="px-6 py-4">Auction Won</th>
                  <th className="px-6 py-4">Bid Expenditure (Rs.)</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {leaderboard.length !== 0 ? (
                  <>
                    {leaderboard.slice(0, 20).map((user, index) => (
                      <tr
                        key={user._id}
                        className={`border-b ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-6 py-4 font-semibold">{index + 1}</td>
                        <td className="px-6 py-4">
                          <img
                            src={user.profileImage?.url}
                            alt={user.username}
                            className="w-12 h-12 rounded-full object-cover border"
                          />
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {user.userName}
                        </td>
                        <td className="px-6 py-4">{user.auctionsWon}</td>
                        <td className="px-6 py-4 text-green-600 font-medium">
                          ₹ {user.moneySpent.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    <tr>
                      <td colSpan="5">
                        <p className="text-center text-gray-500 py-6">
                          No leaderboard data available.
                        </p>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default Leaderboard;
