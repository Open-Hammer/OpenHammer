import React, { StrictMode, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./layout/Navbar.jsx";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import SubmitCommission from "./pages/SubmitCommission.jsx";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./layout/Footer.jsx";
import { fetchUser, fetchLeaderboard } from "./store/slices/userSlice.js";
import AboutUs from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import { getAllAuctionItems } from "./store/slices/auctionSlice.js";
import Leaderboard from "./layout/Leaderboard.jsx";
import Auctions from "./pages/Auctions.jsx";
import AuctionItem from "./pages/AuctionItem.jsx";
import CreateAuction from "./pages/CreateAuction.jsx";
import MyAuctions from "./pages/MyAuctions.jsx";
import ViewAuctionDetails from "./pages/ViewAuctionDetails.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import MyProfile from "./pages/MyProfile.jsx";
const App = () => {
  const dispatch = useDispatch();
  // const { isAuthenticated } = useSelector((state) => state.user);
  // console.log(isAuthenticated);
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(getAllAuctionItems());
    dispatch(fetchLeaderboard());
  }, []);
  return (
    <StrictMode>
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
          <Route path="/auction/item/:id" element={<AuctionItem />} />
          <Route path="/create-auction" element={<CreateAuction />} />
          <Route path="/view-my-auctions" element={<MyAuctions />} />
          <Route path="/auction/details/:id" element={<ViewAuctionDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/me" element={<MyProfile />} />
        </Routes>
        <ToastContainer position="top-right" />
        <Footer />
      </Router>
    </StrictMode>
  );
};

export default App;
