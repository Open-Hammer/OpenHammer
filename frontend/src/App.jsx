import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./layout/Navbar.jsx";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import SubmitCommission from "./pages/SubmitCommission.jsx";
import { useDispatch } from "react-redux";
import Footer from "./layout/Footer.jsx";
import { fetchUser, fetchLeaderboard } from "./store/slices/userSlice.js";
import AboutUs from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import { getAllAuctionItems } from "./store/slices/auctionSlice.js";
import Leaderboard from "./layout/Leaderboard.jsx";
import Auctions from "./pages/Auctions.jsx";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(getAllAuctionItems());
    dispatch(fetchLeaderboard());
  }, []);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/submit-commission" element={<SubmitCommission />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/auctions" element={<Auctions />} />
      </Routes>
      <ToastContainer position="top-right" />
      <Footer />
    </Router>
  );
};

export default App;
