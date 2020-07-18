const express = require("express");
const serverless = require("serverless-http");
const cookieParser = require("cookie-parser");

const app = express();
const router = express();

// API Routes
const events = require("./routes/events");
const auth = require("./routes/auth");
// API Routes

app.use("/.netlify/functions/api", router);

router.use(express.json());
router.use(cookieParser());

router.use("/events", events);
router.use("/auth", auth);

module.exports.handler = serverless(app);
