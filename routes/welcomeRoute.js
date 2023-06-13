const express = require("express");
const { welcome } = require("../controllers/welcomeController");
const router = express.Router();

router.route("/welcome").get(welcome);
module.exports = router;
