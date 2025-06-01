// this middleware will verify if the user who is placing the bid is placing the bid
// for the currently running auction or not by verifying the end time of the auction
//  for which he is placing the bid
import mongoose from "mongoose";
import ErrorHandler from "./error.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import { Auction } from "../models/auctionSchema.js";
export const checkAuctionEndTime = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid Id format", 400));
  }
  const auction = await Auction.findById(id);
  if (!auction) {
    return next(new ErrorHandler("Auction not found", 404));
  }
  const now = new Date();
  if (new Date(auction.startTime) > now) {
    return next(new ErrorHandler("Auction has not started yet.", 400));
  }
  if (new Date(auction.endTime) < now) {
    return next(new ErrorHandler("Auction has ended.", 400));
  }
  next();
});
