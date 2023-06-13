const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.welcome = (req, res, next) => {
  res.status(200).json({ success: true, message: "API successfully called" });
};
