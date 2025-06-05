import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCommissionProof } from "../store/slices/commissionSlice";

const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);

  const proofHandler = (e) => {
    const file = e.target.files[0];
    setProof(file);
  };

  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);
    dispatch(postCommissionProof(formData));
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 px-6 lg:px-0 flex justify-center items-start">
      <form
        onSubmit={handlePaymentProof}
        className="bg-white shadow-2xl rounded-3xl w-full max-w-3xl px-12 py-14 space-y-8"
      >
        <h2 className="text-4xl font-bold text-gray-800 text-center">
          Submit Payment Proof
        </h2>

        <div className="flex flex-col gap-3">
          <label className="text-lg font-semibold text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount paid"
            className="w-full px-5 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-lg font-semibold text-gray-700">
            Payment Proof (Screenshot)
          </label>
          <input
            type="file"
            onChange={proofHandler}
            className="w-full px-5 py-3 text-lg border border-gray-300 rounded-xl cursor-pointer bg-white focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-lg font-semibold text-gray-700">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={6}
            placeholder="Any additional information"
            className="w-full px-5 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 text-2xl font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-300"
        >
          {loading ? "Uploading..." : "Upload Proof"}
        </button>
      </form>
    </section>
  );
};

export default SubmitCommission;
