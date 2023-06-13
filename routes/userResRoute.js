const express = require("express");
const { userResponse } = require("../controllers/userResController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/submit-test").post(isAuthenticatedUser, userResponse);

module.exports = router;
