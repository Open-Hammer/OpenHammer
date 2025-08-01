import { Auction } from "../models/auctionSchema.js";
import User from "../models/userSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { Bid } from "../models/bidSchema.js";
export const addNewAuctionItem = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Auction Item image required", 400));
  }
  console.log(req.body);

  const { image } = req.files;

  const allowedFormats = ["image/png", "image/webp", "image/jpeg"];
  if (!allowedFormats.includes(image.mimetype)) {
    return next(new ErrorHandler("File format not supported", 400));
  }
  const {
    title,
    description,
    category,
    condition,
    startingBid,
    startTime,
    endTime,
  } = req.body;
  if (
    !title ||
    !description ||
    !category ||
    !condition ||
    !startingBid ||
    !startTime ||
    !endTime
  ) {
    return next(new ErrorHandler("Please provide all details", 400));
  }
  // checking the starting time of the auction from present time
  if (new Date(startTime) < Date.now()) {
    return next(
      new ErrorHandler(
        "Auction starting time must be greater than present time",
        400
      )
    );
  }
  if (new Date(startTime) >= new Date(endTime)) {
    return next(
      new ErrorHandler(
        "Auction starting time must be less than ending time",
        400
      )
    );
  }
  const alreadyOneAuctionActive = await Auction.find({
    createdBy: req.user._id,
    endTime: { $gt: Date.now() },
  });
  console.log(alreadyOneAuctionActive);
  if (alreadyOneAuctionActive.length > 0) {
    return next(new ErrorHandler("You already have one active auction.", 400));
  }

  //   try {
  const cloudinaryResponse = await cloudinary.uploader.upload(
    image.tempFilePath,
    {
      folder: "openhammer_auction",
    }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.log("sfdfdsf ");
    console.error(
      "Cloudinary error:",
      cloudinaryResponse.error || "Unknown cloudinary error"
    );
    return next(
      new ErrorHandler("Failed to upload auction image to cloudinary", 500)
    );
  }
  const auctionItem = await Auction.create({
    title,
    description,
    category,
    condition,
    startingBid,
    startTime,
    endTime,
    image: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    createdBy: req.user._id,
  });
  return res.status(201).json({
    success: true,
    message: `Auction item is created and will be listed on auction page at ${startTime}`,
    auctionItem,
  });
  //   } catch (error) {
  //     return next(
  //       new ErrorHandler(error.message || "Failed to create auction", 500)
  //     );
  //   }
});

export const getAllItems = catchAsyncErrors(async (req, res, next) => {
  let items = await Auction.find();
  res.status(200).json({
    success: true,
    items,
  });
});
export const getMyAuctionItems = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const items = await Auction.find({ createdBy: userId });
  res.status(200).json({
    success: true,
    items,
  });
});
export const getAuctionDetails = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid Id format", 400));
  }
  const auctionItem = await Auction.findById(id);
  if (!auctionItem) {
    return next(new ErrorHandler("Auction not found", 404));
  }
  const bidders = auctionItem.bids.sort((a, b) => b.amount - a.amount);
  res.status(200).json({
    success: true,
    auctionItem,
    bidders,
  });
});
export const removeFromAuction = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid Id format", 400));
  }
  const auctionItem = await Auction.findById(id);
  if (!auctionItem) {
    return next(new ErrorHandler("Auction not found", 404));
  }
  await auctionItem.deleteOne();
  res.status(200).json({
    sucess: true,
    message: "Auction item deleted successfully.",
  });
});
export const republishItem = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid Id format", 400));
  }
  let auctionItem = await Auction.findById(id);
  if (!auctionItem) {
    return next(new ErrorHandler("Auction not found", 404));
  }
  if (!req.body.startTime || !req.body.endTime) {
    return next(
      new ErrorHandler("Start time and End time for republish is mandatory.")
    );
  }
  if (new Date(auctionItem.endTime) > Date.now()) {
    return ErrorHandler("Auction is alreaady active, cannot republish", 400);
  }
  let data = {
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  };
  if (data.startTime < Date.now()) {
    return next(
      new ErrorHandler(
        "Auction starting time must be greater than present time",
        400
      )
    );
  }
  if (data.startTime >= data.endTime) {
    return next(
      new ErrorHandler(
        "Auction starting time must be less than ending time",
        400
      )
    );
  }

  if (auctionItem.highestBidder) {
    const highestBidder = await User.findById(auctionItem.highestBidder);
    highestBidder.moneySpent -= auctionItem.currentBid;
    highestBidder.auctionsWon -= 1;
    highestBidder.save();
  }
  data.bids = [];
  data.commissionCalculated = false;
  data.currentBid = 0;
  data.highestBidder = null;
  auctionItem = await Auction.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  await Bid.deleteMany({ auctionItem: auctionItem._id });
  // here run validators is false because on validating it again the password is stored in hashed format which is more than 8 characters so it will through an error
  const createdBy = await User.findByIdAndUpdate(
    req.user._id,
    { unpaidCommission: 0 },
    { new: true, runValidators: false, useFindAndModify: false }
  );
  res.status(200).json({
    success: true,
    auctionItem,
    message: `Auction republished and will be active on ${req.body.startTime}`,
    createdBy,
  });
});
