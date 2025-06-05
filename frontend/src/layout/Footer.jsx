import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { FaHammer } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-20 mt-10 rounded-t-3xl shadow-inner">
      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <FaHammer className="text-3xl text-yellow-500" />
            <h1 className="text-2xl font-bold text-white">OpenHammer</h1>
          </div>
          <p className="text-sm text-gray-400">
            The ultimate destination for online auctions. Bid smart. Win big.
          </p>
        </div>
        <div>
          <h2 className="text-white font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/about" className="hover:text-yellow-500">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-yellow-500">
                Contact
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-yellow-500">
                FAQ
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-yellow-500">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-yellow-500">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white font-semibold mb-3">Auction Services</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/live-auctions" className="hover:text-yellow-500">
                Live Auctions
              </a>
            </li>
            <li>
              <a href="/categories" className="hover:text-yellow-500">
                Categories
              </a>
            </li>
            <li>
              <a href="/sell" className="hover:text-yellow-500">
                Sell with Us
              </a>
            </li>
            <li>
              <a href="/my-bids" className="hover:text-yellow-500">
                My Bids
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-yellow-500">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-yellow-500">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-yellow-500">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-yellow-500">
              <FaLinkedin />
            </a>
          </div>
          <p className="text-xs mt-4 text-gray-500">
            &copy; 2025 OpenHammer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
