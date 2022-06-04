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

app.get("/timestamp/api/", (req, res) => {
  const currentTime = new Date();
  return res.status(200).json({
    unix: Date.now(),
    utc: currentTime.toUTCString(),
  });
});

app.get("/timestamp/api/:date", (req, res) => {
  let dateString = req.params.date;

  if (!isNaN(Date.parse(dateString))) {
    let dateObject = new Date(dateString);
    res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
  } else if (/\d{5,}/.test(dateString)) {
    let dateInt = parseInt(dateString);
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  } else {
    res.json({ error: "Invalid Date" });
  }

  // const dateStr = req.params.date;
  // const timestamp = +dateStr;
  // const dateObj = new Date(timestamp);

  // if (/^\d{5,}/.test(dateStr)) {
  //   return res.status(200).json({
  //     unix: timestamp,
  //     utc: new Date(timestamp).toUTCString(),
  //   });
  // }
  // if (dateObj.toString() === "Invalid Date") {
  //   return res.status(200).json({ error: "Invalid Date" });
  // } else {
  //   return res.status(200).json({
  //     unix: dateObj.getTime(),
  //     utc: dateObj.toUTCString(),
  //   });
  // }
});

app.get("/header-parser/api/whoami", (req, res) => {
  return res.status(200).json({
    ipaddress: req.ip,
    language: "ENG",
    software: "javaScript",
  });
});

module.exports = app;
