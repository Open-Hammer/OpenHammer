import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { FaHammer } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-20 shadow-inner">
      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <FaHammer className="text-3xl text-yellow-500" />
            <h1 className="text-2xl font-bold text-blue-500">
              Open <span className="text-orange-600">Hammer</span>
            </h1>
          </div>
          <p className="text-sm text-gray-400">
            The ultimate destination for online auctions. Bid smart. Win big.
          </p>
        </div>
        <div>
          <h2 className="text-white font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-yellow-500">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white font-semibold mb-3">Auction Services</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/auctions" className="hover:text-yellow-500">
                Live Auctions
              </Link>
            </li>
            <li>
              <Link to="/view-my-auctions" className="hover:text-yellow-500">
                My Auctions
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4 text-xl">
            <Link to="#" className="hover:text-yellow-500">
              <FaFacebookF />
            </Link>
            <Link to="#" className="hover:text-yellow-500">
              <FaTwitter />
            </Link>
            <Link to="#" className="hover:text-yellow-500">
              <FaInstagram />
            </Link>
            <Link to="#" className="hover:text-yellow-500">
              <FaLinkedin />
            </Link>
          </div>
          <p className="text-xs mt-4 text-gray-500">
            &copy; 2025 OpenHammer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
