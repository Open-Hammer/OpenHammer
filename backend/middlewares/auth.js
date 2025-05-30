import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // i have to access the token
  // the below line is only possible because i have used cookieparser in server.js file
  const token = req.cookies.token;
  if (!token) {
    return next(new ErrorHandler("User not authenticated", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id); // i am accessing id because in models in generatetoken function i have added id in the payload;
  next();
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
