import { User } from "../models/uesSchema.js";
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
  req.user = await User.findById(decoded.id);
  next();
});
