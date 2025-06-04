import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const naviagteTo = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(Login(formData));
  };
  useEffect(() => {
    if (isAuthenticated) {
      naviagteTo("/");
    }
  }, [dispatch, isAuthenticated, loading]);
  return (
    <>
      <section className="w-full px-6 pt-24 lg:pl-[100px] min-h-screen bg-gray-50">
        <div className="bg-white max-w-4xl mx-auto p-6 rounded-2xl shadow-md space-y-6 sm:w-[600px] sm:h-[450px]">
          <h1 className="text-[#d6482b] text-4xl md:text-5xl font-extrabold text-center">
            Login
          </h1>
          <form className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-500">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-base py-2 bg-transparent border-b border-gray-400 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-500">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-base py-2 bg-transparent border-b border-gray-400 focus:outline-none"
              />
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-800 transition-all duration-300 text-white text-lg font-semibold py-3 px-6 rounded-lg w-full max-w-md mx-auto flex  justify-center"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging..." : "Login"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
