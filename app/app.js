const express = require("express");

const app = express();

app.use(express.json()); // for parsing the request body.

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Hey! Glad to see you.",
  });
});

app.get("/api/", (req, res) => {
  const currentTime = new Date();
  return res.status(200).json({
    unix: Date.now(),
    utc: currentTime.toUTCString(),
  });
});

app.get("/api/:date", (req, res) => {
  const dateStr = req.params.date;
  const timestamp = +dateStr;
  const dateObj = new Date(timestamp);

  if (/^\d{5,}/.test(dateStr)) {
    return res.status(200).json({
      unix: timestamp,
      utc: new Date(timestamp),
    });
  }
  if (dateObj.toString() === "Invalid Date") {
    return res.status(200).json({ error: "Invalid Date" });
  } else {
    return res.status(200).json({
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString(),
    });
  }
});

module.exports = app;
