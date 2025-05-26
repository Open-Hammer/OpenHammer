import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    minLength: [3, "Username must contain atleat 3 characters"],
    maxLength: [40, "Username cannot exceed 40 characters"],
  },
  password: {
    type: String,
    selected: false,
    minLength: [8, "Password must be atleast 8 characters"],
    maxLength: [32, "Password must not exceed 32 characters"],
  },
  email: {
    type: String,
    unique: true,
  },
  address: String,
  phone: {
    type: String,
    minLength: [10, "phone number must be atleast 10 digits"],
    maxLength: [10, "phone number must not exceed 10 digits"],
  },
  profileImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  paymentMethods: {
    bankTransfer: {
      bankAccountNumber: String,
      bankAccountName: String,
      bankName: String,
    },
    razorpay: {
      razorpayAccountNumber: Number,
    },
    upiId: {
      upiId: String,
    },
  },
  role: {
    type: String,
    enum: ["Auctioneer", "Bidder", "Super Admin"],
  },
  unpaidCommission: {
    type: Number,
    default: 0,
  },
  auctionsWon: {
    type: Number,
    default: 0,
  },
  moneySpent: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("User", userSchema);
export default User;
