import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCommissionProof } from "../store/slices/commissionSlice";
const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const proofHandler = (e) => {
    const file = e.target.files[0];
    setProof(file);
  };
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.commission);
  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);
    dispatch(postCommissionProof(formData));
  };

  return (
    <>
      <section className="w-full px-6 pt-24 lg:pl-[100px] min-h-screen bg-gray-50">
        <div className="bg-white max-w-4xl mx-auto p-6 rounded-2xl shadow-md space-y-6 sm:w-[600px] sm:h-auto">
          <form className="flex flex-col gap-5 w-full">
            <h3>Upload Payment Proof</h3>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-500 ">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-base py-2 bg-transparent border-b border-gray-400 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-500 ">
                Payment Proof(Screenshot)
              </label>
              <input
                type="file"
                onChange={proofHandler}
                className="text-base py-2 bg-transparent border-b border-gray-400 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-500 ">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                row={10}
                className="text-base py-2 bg-transparent border-[2px] rounded-md px-1 border-stone-400 focus:outline-none"
              />
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-800 transition-all duration-300 text-white text-xl font-semibold py-3 px-6 rounded-lg w-full max-w-md mx-auto flex  justify-center"
              type="submit"
            >
              {loading ? "Uploading..." : "Upload Proof"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SubmitCommission;
