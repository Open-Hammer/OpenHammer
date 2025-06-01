import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Auction } from "../models/auctionSchema.js";
import { Bid } from "../models/bidSchema.js";
import User from "../models/userSchema.js";

export const placeBid = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const auctionItem = await Auction.findById(id);
  if (!auctionItem) {
    return next(new ErrorHandler("Auction item not found", 404));
  }
  const { amount } = req.body; // must be provided by the user
  if (!amount) {
    return next(new ErrorHandler("Please place your bid", 404));
  }
  if (amount <= auctionItem.currentBid) {
    return next(
      new ErrorHandler("Bid Amount must be greater than current Bid", 404)
    );
  }
  if (amount <= auctionItem.startingBid) {
    return next(
      new ErrorHandler("Bid Amount must be greater than starting Bid", 404)
    );
  }
  try {
    // finding the previous bid of the user
    const existingBid = await Bid.findOne({
      "bidder.id": req.user._id,
      auctionItem: auctionItem._id,
    });
    // bids is an array. finding the id of the user placing the bid in the previously placed bid
    const existingBidInAuction = auctionItem.bids.find(
      (bid) => bid.userId.toString() == req.user._id.toString()
    );
    if (existingBid && existingBidInAuction) {
      existingBidInAuction.amount = amount; // amount has been varified earlier
      existingBid.amount = amount;
      await existingBidInAuction.save();
      await existingBid.save();
      auctionItem.currentBid = amount;
    } else {
      // if the user is a new bidder has placed his first bid
      const bidderDetail = await User.findById(req.user._id);
      const bid = await Bid.create({
        amount,
        bidder: {
          id: bidderDetail._id,
          userName: bidderDetail.userName,
          profileImage: bidderDetail.profileImage?.url,
        },
        auctionItem: auctionItem._id,
      });
      auctionItem.bids.push({
        userId: req.user._id,
        userName: bidderDetail.userName,
        profileImage: bidderDetail.profileImage?.url,
        amount,
      });
      await auctionItem.save();

      res.status(201).json({
        success: true,
        message: "Bid placed.",
        currentBid: auctionItem.currentBid,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message || "Failed to place bid ", 500));
  }
});
