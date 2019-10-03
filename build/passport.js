"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportGithub = _interopRequireDefault(require("passport-github"));

var _passportFacebook = _interopRequireDefault(require("passport-facebook"));

var _User = _interopRequireDefault(require("./models/User"));

var _userController = require("./controller/userController");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_passport["default"].use(_User["default"].createStrategy());

_passport["default"].use(new _passportGithub["default"]({
  clientID: process.env.GH_ID,
  clientSecret: process.env.GH_SECRET,
  callbackURL: "http://localhost:4000".concat(_routes["default"].gitHubCallback) //`https://secret-forest-59446.herokuapp.com${routes.gitHubCallback}`

}, _userController.githubLoginCallback));

https: _passport["default"].use(new _passportFacebook["default"]({
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: "https://splendid-crab-82.localtunnel.me".concat(_routes["default"].facebookLoginCallback),
  profileFields: ["id", "displayName", "photos", "email"],
  scope: ["public_profile", "email"]
}, _userController.facebookLoginCallback));

_passport["default"].serializeUser(_User["default"].serializeUser());

_passport["default"].deserializeUser(_User["default"].deserializeUser());