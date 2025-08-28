let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const cors = require("cors");
const { serverError } = require("./response");

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const origin = ["http://localhost:5173"];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

app.use(cors({ origin: origin, credentials: true }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use("/api", require("./router"));

app.use(function (err, req, res, next) {
  const errMessage =
    typeof err === "string" ? err : err.message || "Unexpected error occurred";

  const statusCode = err.status || err.statusCode || 500;

  return res
    .status(statusCode)
    .send(serverError("Something went wrong", errMessage, err));
});

module.exports = app;
