import {
  deletePaymentProof,
  getSinglePaymentProofDetail,
  updatePaymentProof,
} from "@/store/slices/superAdminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PaymentProofs = () => {
  const { paymentProofs, singlePaymentProof } = useSelector(
    (state) => state.superAdmin
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  const handlePaymentProofDelete = (id) => {
    dispatch(deletePaymentProof(id));
  };

  const handleFetchPaymentDetail = (id) => {
    dispatch(getSinglePaymentProofDetail(id));
  };

  useEffect(() => {
    if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
      setOpenDrawer(true);
    }
  }, [singlePaymentProof]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse mt-6 min-w-[600px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                User ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(paymentProofs) && paymentProofs.length > 0 ? (
              paymentProofs.map((element, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {element.userId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {element.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleFetchPaymentDetail(element._id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handlePaymentProofDelete(element._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 text-gray-500 text-center" colSpan="3">
                  No payment proofs are found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
    </>
  );
};

export default PaymentProofs;

export const Drawer = ({ setOpenDrawer, openDrawer }) => {
  const { singlePaymentProof, loading } = useSelector(
    (state) => state.superAdmin
  );
  const [amount, setAmount] = useState(singlePaymentProof.amount || "");
  const [status, setStatus] = useState(singlePaymentProof.status || "");

  const dispatch = useDispatch();
  const handlePaymentProofUpdate = () => {
    dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
  };

  return (
    <section
      className={`fixed ${
        openDrawer && singlePaymentProof.userId ? "bottom-0" : "-bottom-full"
      } left-0 w-full transition-all duration-300 h-full bg-black bg-opacity-60 flex items-end z-50`}
    >
      <div className="bg-white w-full max-w-xl p-6 rounded-t-lg shadow-lg mx-auto">
        <div>
          <h3 className="text-xl font-semibold mb-2">Update Payment Proof</h3>
          <p className="mb-4 text-gray-600">
            You can update payment status and amount.
          </p>
          <form>
            <div className="mb-4">
              <label className="block mb-1 font-medium">User ID</label>
              <input
                type="text"
                value={singlePaymentProof.userId || ""}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Settled">Settled</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Comment</label>
              <textarea
                rows={5}
                value={singlePaymentProof.comment || ""}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <Link
                to={singlePaymentProof.proof?.url || ""}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Payment Proof (SS)
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handlePaymentProofUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {loading ? "Updating Payment Proof" : "Update Payment Proof"}
              </button>
              <button
                type="button"
                onClick={() => setOpenDrawer(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
