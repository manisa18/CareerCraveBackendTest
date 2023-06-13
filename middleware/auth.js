const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/authModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource"), 401);
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(data.id);
    if (!req.user) {
      return next(new ErrorHandler("User not found"), 404);
    }

    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token"), 401);
  }
});
