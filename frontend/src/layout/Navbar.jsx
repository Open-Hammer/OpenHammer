import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import {
  RiAuctionFill,
  RiInstagramFill,
  RiMenu3Fill,
  RiCloseLine,
} from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook, FaEye } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";
import { FaHammer } from "react-icons/fa";
const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link to={"/"}>
          <div className="flex items-center  mb-3 flex-wrap sm:flex-nowrap">
            <FaHammer className="text-2xl sm:text-3xl text-yellow-500" />
            <h1 className="text-xl sm:text-2xl font-bold text-blue-500">
              Open
              <span className="text-xl sm:text-3xl text-orange-600">
                Hammer
              </span>
            </h1>
          </div>
        </Link>

        <div
          className="md:hidden text-1xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <RiCloseLine /> : <RiMenu3Fill />}
        </div>

        <ul className="hidden md:flex gap-6 items-center text-gray-700 font-semibold text-sm">
          <li>
            <Link
              to="/auctions"
              className="flex items-center gap-1 hover:text-red-600"
            >
              <RiAuctionFill className="text-sm" />
              Auctions
            </Link>
          </li>
          <li>
            <Link
              to="/leaderboard"
              className="flex items-center gap-1 hover:text-red-600"
            >
              <MdLeaderboard className="text-sm" />
              Leaderboard
            </Link>
          </li>

          {isAuthenticated && user?.role === "Auctioneer" && (
            <>
              <li>
                <Link
                  to="/submit-commission"
                  className="flex items-center gap-1 hover:text-red-600"
                >
                  <FaFileInvoiceDollar className="text-sm" />
                  Submit Commission
                </Link>
              </li>
              <li>
                <Link
                  to="/create-auction"
                  className="flex items-center gap-1 hover:text-red-600"
                >
                  <IoIosCreate className="text-sm" />
                  Create Auction
                </Link>
              </li>
              <li>
                <Link
                  to="/view-my-auctions"
                  className="flex items-center gap-1 hover:text-red-600"
                >
                  <FaEye className="text-sm" />
                  My Auctions
                </Link>
              </li>
            </>
          )}

          {isAuthenticated && user?.role === "Super Admin" && (
            <li>
              <Link
                to="/dashboard"
                className="flex items-center gap-1 hover:text-red-600"
              >
                <MdDashboard className="text-sm" />
                Dashboard
              </Link>
            </li>
          )}

          <li>
            <Link
              to="/about"
              className="flex items-center gap-1 hover:text-red-600"
            >
              <BsFillInfoSquareFill className="text-sm" />
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="flex items-center gap-1 hover:text-red-600"
            >
              <IoMdContact className="text-sm" />
              Contact Us
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/sign-up"
                className="text-green-500 border border-green-300 px-4 py-1 rounded hover:bg-green-50 text-sm font-medium"
              >
                Sign Up
              </Link>
              <Link
                to="/Login"
                className="text-blue-600 border border-blue-600 px-4 py-1 rounded hover:bg-blue-50 text-sm font-medium"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded text-sm font-medium hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pb-4 pt-2 flex flex-col gap-4 text-sm font-medium text-gray-700">
          <Link
            to="/auctions"
            onClick={() => setMenuOpen(false)}
            className="hover:text-red-600 flex gap-2 items-center"
          >
            <RiAuctionFill /> Auctions
          </Link>
          <Link
            to="/leaderboard"
            onClick={() => setMenuOpen(false)}
            className="hover:text-red-600 flex gap-2 items-center"
          >
            <MdLeaderboard /> Leaderboard
          </Link>

          {isAuthenticated && user && user.role === "Auctioneer" && (
            <>
              <Link
                to="/submit-commission"
                onClick={() => setMenuOpen(false)}
                className="hover:text-red-600 flex gap-2 items-center"
              >
                <FaFileInvoiceDollar /> Submit Commission
              </Link>
              <Link
                to="/create-auction"
                onClick={() => setMenuOpen(false)}
                className="hover:text-red-600 flex gap-2 items-center"
              >
                <IoIosCreate /> Create Auction
              </Link>
              <Link
                to="/view-my-auctions"
                onClick={() => setMenuOpen(false)}
                className="hover:text-red-600 flex gap-2 items-center"
              >
                <FaEye /> My Auctions
              </Link>
            </>
          )}

          {isAuthenticated && user && user.role === "Super Admin" && (
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="hover:text-red-600 flex gap-2 items-center"
            >
              <MdDashboard /> Dashboard
            </Link>
          )}

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="hover:text-red-600 flex gap-2 items-center"
          >
            <BsFillInfoSquareFill /> About
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="hover:text-red-600 flex gap-2 items-center"
          >
            <IoMdContact /> Contact
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                to="/sign-up"
                onClick={() => setMenuOpen(false)}
                className="text-red-500 px-4 py-1 rounded hover:text-green-700"
              >
                Sign Up
              </Link>
              <Link
                to="/Login"
                onClick={() => setMenuOpen(false)}
                className="text-blue-600  px-4 py-1 rounded hover:text-blue-800"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
