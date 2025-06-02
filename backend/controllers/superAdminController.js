import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Commission } from "../models/commissionSchema.js";
import User from "../models/userSchema.js";
import mongoose from "mongoose";
import { Auction } from "../models/auctionSchema.js";
import { PaymentProof } from "../models/commissionProofSchema.js";

export const deleteAuctionItem = catchAsyncErrors(async (req, res, next) => {
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

export const getAllPaymentProofs = catchAsyncErrors(async (req, res, next) => {
  let PaymentProofs = await PaymentProof.find();
  res.status(200).json({
    success: true,
    PaymentProofs,
  });
});

export const getPaymentProofDetail = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const paymentProofDetail = await PaymentProof.findById(id);
    res.status(200).json({
      success: true,
      paymentProofDetail,
    });
  }
);

export const updateProofStatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { amount, status } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid Id format.", 400));
  }
  let proof = await PaymentProof.findById(id);
  if (!proof) {
    return next(new ErrorHandler("Payment proof not found.", 400));
  }
  proof = await PaymentProof.findByIdAndUpdate(
    id,
    { status, amount },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Payment proof amount and status updated",
    proof,
  });
});

export const deletePaymentProof = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid Id format", 400));
  }
  const proof = await PaymentProof.findById(id);
  if (!proof) {
    return next(new ErrorHandler("Payment proof not found", 404));
  }
  await proof.deleteOne();
  res.status(200).json({
    success: true,
    message: "Payment proof deleted",
  });
});

// function to fetch the users according to some criteria
// like how many users are registered in the last month
// who are auctioneers,bidders what are their status of the payment
// and other similiar things for this i am going to use aggregation pipelines
// provided by mongodb just like we use in sql queries
export const fetchAllUsers = catchAsyncErrors(async (req, res, next) => {
  // grouping the users by their creation date and role
  // and count how many users of each role was created per month;
  const users = await User.aggregate([
    {
      $group: {
        // this will group the all users by 1:the month they are created 2:year they are created 3: role
        _id: {
          month: { $month: "$createdAt" }, // (1)
          year: { $year: "$createdAt" }, // (2)
          role: "$role", // (3)
        },
        count: { $sum: 1 }, // counts how many users belong to that group
      },
    },
    {
      $project: {
        // it reshapes the result to a cleaner format and removes _id
        month: "$_id.month",
        year: "$_id.year",
        role: "$_id.role",
        count: 1,
        _id: 0,
      },
    },
    {
      $sort: { year: 1, month: 1 }, // it sorts the results by year and then by month in ascending order
    },
  ]);

  const bidders = users.filter((user) => user.role === "Bidder"); // used to filter the users with role bidders
  const auctioneers = users.filter((user) => user.role === "Auctioneer"); // do the same but with role auctioneers

  const transformDataToMonthlyArray = (data, totalMonths = 12) => {
    const result = Array(totalMonths).fill(0); // creating and array with 12 zeros
    data.forEach((item) => {
      result[item.month - 1] = item.count; // assigning the number of users in the respective index (-1) because of 0-indexed
    });
    return result;
  };

  const biddersArray = transformDataToMonthlyArray(bidders);
  const auctioneersArray = transformDataToMonthlyArray(auctioneers);
  res.status(200).json({
    success: true,
    biddersArray,
    auctioneersArray,
  });
});

// result of the above function will look like this (dummy)

/*
{
  "success": true,
  "biddersArray": [0, 1, 2, 3, 1, 0, 0, 0, 0, 0, 0, 0],
  "auctioneersArray": [0, 0, 1, 2, 4, 1, 0, 0, 0, 0, 0, 0]
}
*/

export const monthlyRevenue = catchAsyncErrors(async (req, res, next) => {
  const payments = await Commission.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        totalAmount: { $sum: "$amount" },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);

  // here we are not using project so accessing by ._id.month

  const transformDataToMonthlyArray = (payments, totalMonths = 12) => {
    const result = Array(totalMonths).fill(0); // creating and array with 12 zeros
    payments.forEach((payment) => {
      result[payment._id.month - 1] = payment.totalAmount; // assigning the number of users in the respective index (-1) because of 0-indexed
    });
    return result;
  };

  const totalMonthlyRevenue = transformDataToMonthlyArray(payments);
  res.status(200).json({
    success: true,
    totalMonthlyRevenue,
  });
});
/* sample output by postman
{
    "success": true,
    "totalMonthlyRevenue": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ]
}
    */
