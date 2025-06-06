import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [upiId, setUpiId] = useState("");
  const [razorpayAccountNumber, setRazorpayAccountNumber] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("password", password);
    formData.append("profileImage", profileImage);
    if (role === "Auctioneer") {
      formData.append("bankAccountName", bankAccountName);
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankName", bankName);
      formData.append("paypalEmail", paypalEmail);
      formData.append("upiId", upiId);
      formData.append("razorpayAccountNumber", razorpayAccountNumber);
    }
    const res = await dispatch(register(formData));
    if(res.payload?.success) {
      navigateTo("/login");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, loading, isAuthenticated]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileImage(file);
      setProfileImagePreview(reader.result);
    };
  };

  return (
    <section className="w-full px-4 sm:px-6 pt-24 lg:pl-[100px] min-h-screen bg-gray-50">
      <div className="bg-white max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-[#059f15] text-3xl sm:text-5xl font-extrabold text-center">
          Sign Up
        </h1>

        <form onSubmit={handleRegister} className="w-full space-y-6">
          <p className="text-xl sm:text-2xl font-semibold text-gray-700 border-b pb-1">
            Personal Details
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-sm sm:text-base text-gray-600 font-medium">
                Full Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="text-base py-2 px-1 bg-white border-b-2 border-gray-300 focus:outline-none focus:border-[#d6482b] transition-all"
              />
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-sm sm:text-base text-gray-600 font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-base py-2 px-1 bg-white border-b-2 border-gray-300 focus:outline-none focus:border-[#d6482b] transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-sm sm:text-base text-gray-600 font-medium">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-base py-2 px-1 bg-white border-b-2 border-gray-300 focus:outline-none focus:border-[#d6482b] transition-all"
              />
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-sm sm:text-base text-gray-600 font-medium">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="text-base py-2 px-1 bg-white border-b-2 border-gray-300 focus:outline-none focus:border-[#d6482b] transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-sm sm:text-base text-gray-600 font-medium">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="text-base py-2 px-1 bg-white border-b-2 border-gray-300 focus:outline-none focus:border-[#d6482b] transition-all"
              >
                <option value="">Select Role</option>
                <option value="Auctioneer">Auctioneer</option>
                <option value="Bidder">Bidder</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-sm sm:text-base text-gray-600 font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-base py-2 px-1 bg-white border-b-2 border-gray-300 focus:outline-none focus:border-[#d6482b] transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-base text-gray-600 font-medium">
              Profile Image
            </label>
            <div className="flex items-center gap-4 mt-2">
              <img
                src={
                  profileImagePreview ||
                  "https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
                }
                alt="profileImagePreview"
                className="w-16 h-16 rounded-full border object-cover"
              />
              <input type="file" onChange={imageHandler} />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xl sm:text-2xl font-semibold text-gray-700 border-b pb-1">
              Payment Method Details
              <span className="text-sm text-gray-500 font-normal block">
                Fill Payments Details if you are Auctioneer
              </span>
            </p>

            <div className="flex flex-col gap-2">
              <label className="text-sm sm:text-base text-gray-600 font-medium">
                Bank Details
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="text-base py-2 px-1 bg-white border-b-2 border-gray-300 focus:outline-none focus:border-[#d6482b] transition-all sm:flex-1"
                  disabled={role === "Bidder"}
                >
                  <option value="">Select Your Bank</option>
                  <option value="BOI">Bank Of India(BOI)</option>
                  <option value="SBI">State Bank Of India(SBI)</option>
                  <option value="BOB">Bank Of Baroda(BOB)</option>
                  <option value="PNB">Punjab National Bank(PNB)</option>
                </select>
                <input
                  className="text-base py-2 px-1 bg-white border-b-2 border-gray-300 focus:outline-none focus:border-[#d6482b] transition-all sm:flex-1"
                  type="text"
                  value={bankAccountName}
                  placeholder="Bank Account Name"
                  onChange={(e) => setBankAccountName(e.target.value)}
                  disabled={role === "Bidder"}
                />
                <input
                  className="text-base py-2 px-1 bg-white border-b-2 border-gray-300 focus:outline-none focus:border-[#d6482b] transition-all sm:flex-1"
                  type="text"
                  value={bankAccountNumber}
                  placeholder="Bank Account Number"
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  disabled={role === "Bidder"}
                />
              </div>
            </div>

            <div>
              <label className="text-sm sm:text-base text-gray-600 font-medium">
                Paypal Details
              </label>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <input
                  type="email"
                  value={paypalEmail}
                  placeholder="paypal@gmail.com"
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  className="text-base py-2 px-1 bg-white border-b-2 border-gray-300 focus:outline-none focus:border-[#d6482b] transition-all sm:flex-1"
                  disabled={role === "Bidder"}
                />
              </div>
            </div>
            <div>
              <label className="text-sm sm:text-base text-gray-600 font-medium">
                Razorpay Details
              </label>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <input
                  type="text"
                  value={razorpayAccountNumber}
                  placeholder="Razorpay account number"
                  onChange={(e) => setRazorpayAccountNumber(e.target.value)}
                  className="text-base py-2 px-1 bg-white border-b-2 border-gray-300 focus:outline-none focus:border-[#d6482b] transition-all sm:flex-1"
                  disabled={role === "Bidder"}
                />
              </div>
            </div>
            <div>
              <label className="text-sm sm:text-base text-gray-600 font-medium">
                UPI Details
              </label>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <input
                  type="text"
                  value={upiId}
                  placeholder="UPI ID"
                  onChange={(e) => setUpiId(e.target.value)}
                  className="text-base py-2 px-1 bg-white border-b-2 border-gray-300 focus:outline-none focus:border-[#d6482b] transition-all sm:flex-1"
                  disabled={role === "Bidder"}
                />
              </div>
            </div>
          </div>

          <button
            className="bg-[hsl(138,94%,25%)] hover:bg-[#41bb18] transition-all duration-300 text-white text-lg font-semibold py-3 px-6 rounded-lg w-full max-w-md mx-auto flex justify-center"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};
export default SignUp;
