const express = require("express");
const {
  signUpUser,
  loginUser,
  logout,
  updatePhoneNo,
} = require("../controllers/authController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/signup").post(signUpUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/edit/phonenumber/:id").put(isAuthenticatedUser, updatePhoneNo);

module.exports = router;
