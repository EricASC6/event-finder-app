const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

// API Routes
const events = require("./routes/events");
// API Routes

app.use(express.json());
app.use("/.netlify/functions/api", router);

router.use("/events", events);

module.exports.handler = serverless(app);
