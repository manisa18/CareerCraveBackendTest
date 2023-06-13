const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

const auth = require("./routes/authRoute");
const welcome = require("./routes/welcomeRoute");
const userResponse = require("./routes/userResRoute");

app.use("/api/", auth);
app.use("/api/", welcome);
app.use("/api/", userResponse);

// Middleware;
app.use(errorMiddleware);

module.exports = app;
