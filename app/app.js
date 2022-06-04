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
  const currentTime = new Date();
  res.status(200).json({
    status: 200,
    message: "Hey! Glad to see you.",
    unix: Date.now(),
    utc: currentTime.toUTCString(),
  });
});

app.get("/api/:date", (req, res) => {
  const dateInMs = Number(req.params.date);
  const date = new Date(dateInMs).toUTCString();
  res.status(200).json({
    unix: dateInMs,
    utc: `${date}`,
  });
});

module.exports = app;
