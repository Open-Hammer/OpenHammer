// this middleware will check whether there is any unpaid commission of the auctioneer or not
// if found any unpaid commission than will through an error
import User from "../models/userSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

export const trackCommissionStatus = catchAsyncErrors(
  async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (user.unpaidCommission > 0) {
      return next(
        new ErrorHandler(
          "You have unpaid commissions. Please play them before posting a new auction",
          403
        )
      );
    }
    next();
  }
);
