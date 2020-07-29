const express = require("express");
const serverless = require("serverless-http");
const cookieParser = require("cookie-parser");

const app = express();
const router = express();

// API Routes
const events = require("./routes/events");
const auth = require("./routes/auth");
const bookmark = require("./routes/bookmark");
// API Routes

router.use((req, res, next) => {
  console.log("-----------------Request---------------");
  console.log(`${req.method} for ${req.url}`);
  console.log({ query: req.query });
  console.log({ path: req.path });
  next();
});
router.use(express.json());
router.use(cookieParser());

router.use("/events", events);
router.use("/auth", auth);
router.use("/bookmarks", bookmark);
router.get("/", (req, res) => res.status(404).json({ error: "Not found" }));

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
module.exports.devServer = app;
