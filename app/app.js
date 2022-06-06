const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dns = require("dns");
const url = require("url").URL;

const multer = require("multer");
const upload = multer();

const app = express();

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static("../views/short-url"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Hey! Glad to see you.",
  });
});

// ----------------------------------------------------------------------

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
});

// ----------------------------------------------------------------------

app.get("/header-parser/api/whoami", (req, res) => {
  return res.status(200).json({
    ipaddress: req.ip,
    language: "ENG",
    software: "javaScript",
  });
});

// ----------------------------------------------------------------------

app.get("/api/shorturl", (req, res) => {
  return res.sendFile(path.join(__dirname, "../views/short-url/index.html"));
});

app.post("/api/shorturl", (req, res) => {
  const theUrl = req.body.url;
  const urlObject = new URL(theUrl);

  dns.lookup(urlObject.hostname, (err, address, family) => {
    if (err) {
      return res.status(200).json({
        error: "invalid url",
      });
    } else {
      const shortenedURL = Math.floor(Math.random() * 100000).toString();
      return res.status(200).json({
        original_url: theUrl,
        short_url: shortenedURL,
      });
    }
  });
});

module.exports = app;
