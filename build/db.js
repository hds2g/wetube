"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_mongoose["default"].connect(process.env.MONGO_URL_PROD, {
  useNewUrlParser: true,
  useFindAndModify: false
});

var db = _mongoose["default"].connection;

var handlOpen = function handlOpen() {
  return console.log("✅ Connected to DB");
};

var handleError = function handleError() {
  return console.log("❌ Error on DB Connection");
};

db.once("open", handlOpen);
db.on("error", handleError);