const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const User = require("../models/authModel");

exports.signUpUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, phone_number } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    phone_number,
  });

  sendToken(user, 201, "Signed up successfully", res);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, "hewwo", res);
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

exports.updatePhoneNo = catchAsyncErrors(async (req, res, next) => {
  if (req.params.id === req.user.id)
    try {
      const newPhoneNo = {
        phone_number: req.body.phone_number,
      };
      const updatePhoneNo = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: newPhoneNo,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        success: true,
        message: "Phone number changed / added successfully",
      });
    } catch (err) {
      next(err);
    }
  else {
    return next(new ErrorHandler("You can update only your account!", 403));
  }
});
