import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/store/slices/userSlice.js";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const naviagteTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      naviagteTo("/");
    }
  }, [dispatch, loading, isAuthenticated]);

  return (
    <>
      <section className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-6 py-12">
        <div className="bg-white w-full max-w-2xl p-10 rounded-2xl shadow-2xl space-y-8">
          <h1 className="text-[#0b4ff0] text-5xl font-extrabold text-center">
            Login
          </h1>
          <form className="flex flex-col gap-8 w-full" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <label className="text-lg text-gray-700 font-semibold">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-lg py-3 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d6482b] shadow-sm"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg text-gray-700 font-semibold">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-lg py-3 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d6482b] shadow-sm"
                required
              />
            </div>
            <button
              className="bg-[#0754b1] hover:bg-[#0c81f6] transition-all duration-300 text-white text-xl font-semibold py-3 rounded-xl shadow-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
