import ErrorHandler from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/uesSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { generateToken } from "../utils/jwtToken.js";
export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Profile Image Required", 400));
  }
  // console.log(req.body);

  const { profileImage } = req.files;
  const allowedFormats = ["image/png", "image/jpg", "image/webp"];
  if (!allowedFormats.includes(profileImage.mimetype)) {
    return next(new ErrorHandler("File format not supported", 400));
  }
  const {
    userName,
    email,
    password,
    phone,
    address,
    role,
    bankAccountNumber,
    bankAccountName,
    bankName,
    razorpayAccountNumber,
    upiId,
  } = req.body;
  if (!userName || !email || !phone || !password || !address || !role) {
    return next(new ErrorHandler("Please fill form", 400));
  }
  if (role == "Auctioneer") {
    if (!bankAccountNumber || !bankName || !bankAccountName) {
      return next(
        new ErrorHandler("Please provide your full bank details", 400)
      );
    }
    if (!razorpayAccountNumber) {
      return next(
        new ErrorHandler("Please provide your razorpay bank details", 400)
      );
    }
    if (!upiId) {
      return next(new ErrorHandler("Please provide your upi Id ", 400));
    }
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already registered", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    req.files.profileImage.tempFilePath,
    {
      folder: "OpenHammer_users",
    }
  );
  if (!cloudinaryResponse || cloudinary.error) {
    console.log("sfdfdsf ");
    console.error(
      "Cloudinary error:",
      cloudinaryResponse.error || "Unknown cloudinary error"
    );
    return next(
      new ErrorHandler("Failed to upload profile image to cloudinary", 400)
    );
  }
  const user = await User.create({
    userName,
    email,
    password,
    phone,
    address,
    role,
    profileImage: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    paymentMethods: {
      bankTransfer: {
        bankAccountNumber,
        bankAccountName,
        bankName,
      },
      razorpay: {
        razorpayAccountNumber,
      },
      upiId: {
        upiId,
      },
    },
  });
  generateToken(user, "User Registered", 201, res);
});
