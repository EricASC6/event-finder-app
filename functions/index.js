const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./api/auth");
const bookmark = require("./api/bookmark");
const calendar = require("./api/calendar");
const { onUserCreated } = require("./auth/onUserCreated");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/auth", auth);
app.use("/bookmarks", bookmark);
app.use("/calendar", calendar);

exports.api = functions.https.onRequest(app);
exports.onUserCreated = onUserCreated;
