"use strict";

require("./db");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("./app"));

require("./models/Video");

require("./models/Comment");

require("./models/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config(); // imports the file


var PORT = process.env.PORT || 4000;

var handleListening = function handleListening() {
  return console.log("Listening on: http://localhost:".concat(PORT));
};

_app["default"].listen(PORT, handleListening);