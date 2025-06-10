import { deleteAuctionItem } from "@/store/slices/superAdminSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AuctionItemDelete = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const dispatch = useDispatch();

  const handleAuctionDelete = (id) => {
    dispatch(deleteAuctionItem(id));
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-blue-700">
        Manage Auctions
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                Image
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(allAuctions) && allAuctions.length > 0 ? (
              allAuctions.map((element) => (
                <tr key={element._id} className="hover:bg-gray-50 transition">
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={element.image?.url}
                      alt={element.title}
                      className="w-24 h-24 object-contain rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-medium text-gray-800">
                    {element.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <Link
                      to={`/auction/details/${element._id}`}
                      className="inline-block px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleAuctionDelete(element._id)}
                      className="inline-block px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-4 py-8 text-center text-gray-500 font-semibold"
                >
                  No Auctions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuctionItemDelete;
