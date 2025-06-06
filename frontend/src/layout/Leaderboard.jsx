import React from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

const Leaderboard = () => {
  const { leaderboard, loading } = useSelector((state) => state.user);

  const tempLeaderboard = [
    {
      _id: "1",
      username: "Aarav Sharma",
      profileImage: { url: "https://randomuser.me/api/portraits/men/75.jpg" },
      auctionWon: 5,
      moneySpent: 15000,
    },
    {
      _id: "2",
      username: "Priya Verma",
      profileImage: { url: "https://randomuser.me/api/portraits/women/44.jpg" },
      auctionWon: 8,
      moneySpent: 22000,
    },
    {
      _id: "3",
      username: "Rohan Mehta",
      profileImage: { url: "https://randomuser.me/api/portraits/men/22.jpg" },
      auctionWon: 10,
      moneySpent: 30000,
    },
    {
      _id: "4",
      username: "Kavya Nair",
      profileImage: { url: "https://randomuser.me/api/portraits/women/65.jpg" },
      auctionWon: 6,
      moneySpent: 18000,
    },
    {
      _id: "5",
      username: "Vikram Desai",
      profileImage: { url: "https://randomuser.me/api/portraits/men/33.jpg" },
      auctionWon: 9,
      moneySpent: 27000,
    },
    {
      _id: "6",
      username: "Ananya Joshi",
      profileImage: { url: "https://randomuser.me/api/portraits/women/52.jpg" },
      auctionWon: 4,
      moneySpent: 12000,
    },
    {
      _id: "7",
      username: "Raj Patel",
      profileImage: { url: "https://randomuser.me/api/portraits/men/21.jpg" },
      auctionWon: 7,
      moneySpent: 19000,
    },
    {
      _id: "8",
      username: "Meera Iyer",
      profileImage: { url: "https://randomuser.me/api/portraits/women/68.jpg" },
      auctionWon: 3,
      moneySpent: 11000,
    },
    {
      _id: "9",
      username: "Devansh Kulkarni",
      profileImage: { url: "https://randomuser.me/api/portraits/men/76.jpg" },
      auctionWon: 5,
      moneySpent: 16000,
    },
    {
      _id: "10",
      username: "Sneha Reddy",
      profileImage: { url: "https://randomuser.me/api/portraits/women/63.jpg" },
      auctionWon: 6,
      moneySpent: 21000,
    },
  ];

  const displayData = leaderboard?.length ? leaderboard : tempLeaderboard;

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
                {displayData.slice(0, 20).map((user, index) => (
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
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.auctionWon}</td>
                    <td className="px-6 py-4 text-green-600 font-medium">
                      ₹ {user.moneySpent.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default Leaderboard;
