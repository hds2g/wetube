"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postChangePassword = exports.getChangePassword = exports.postEditProfile = exports.getEditProfile = exports.userDetail = exports.getMe = exports.logout = exports.postFacebookLogin = exports.facebookLoginCallback = exports.facebookLogin = exports.postGithubLogin = exports.githubLoginCallback = exports.githubLogin = exports.postLogin = exports.getLogin = exports.postJoin = exports.getJoin = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _routes = _interopRequireDefault(require("../routes"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getJoin = function getJoin(req, res) {
  res.render("join", {
    pageTitle: "Join"
  });
};

exports.getJoin = getJoin;

var postJoin =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, name, email, password, password2, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //console.log(req.body); // by bodyParser
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2;

            if (!(password !== password2)) {
              _context.next = 6;
              break;
            }

            res.status(400);
            res.render("join", {
              pageTitle: "Join"
            });
            _context.next = 19;
            break;

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return (0, _User["default"])({
              name: name,
              email: email
            });

          case 9:
            user = _context.sent;
            _context.next = 12;
            return _User["default"].register(user, password);

          case 12:
            next();
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](6);
            console.log(_context.t0);
            res.redirect(_routes["default"].home);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 15]]);
  }));

  return function postJoin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getLogin = function getLogin(req, res) {
  return res.render("login", {
    pageTitle: "Login"
  });
};

exports.getLogin = getLogin;

var postLogin = _passport["default"].authenticate("local", {
  failureRedirect: _routes["default"].login,
  successRedirect: _routes["default"].home
});

exports.postLogin = postLogin;

var githubLogin = _passport["default"].authenticate("github"); //export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {


exports.githubLogin = githubLogin;

var githubLoginCallback =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_, __, profile, cb) {
    var _profile$_json, id, avatarUrl, name, email, user, newUser;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            //console.log(profile, cb);
            _profile$_json = profile._json, id = _profile$_json.id, avatarUrl = _profile$_json.avatar_url, name = _profile$_json.name, email = _profile$_json.email;
            _context2.prev = 1;
            _context2.next = 4;
            return _User["default"].findOne({
              email: email
            });

          case 4:
            user = _context2.sent;

            if (!user) {
              _context2.next = 10;
              break;
            }

            console.log("githubLoginCallback find user");
            user.githubId = id;
            user.save();
            return _context2.abrupt("return", cb(null, user));

          case 10:
            console.log("githubLoginCallback: not find user, will create");
            _context2.next = 13;
            return _User["default"].create({
              email: email,
              name: name,
              githubId: id,
              avatarUrl: avatarUrl
            });

          case 13:
            newUser = _context2.sent;
            return _context2.abrupt("return", cb(null, newUser));

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", cb(_context2.t0));

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 17]]);
  }));

  return function githubLoginCallback(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports.githubLoginCallback = githubLoginCallback;

var postGithubLogin = function postGithubLogin(req, res) {
  res.redirect(_routes["default"].home);
};

exports.postGithubLogin = postGithubLogin;

var facebookLogin = _passport["default"].authenticate("facebook");

exports.facebookLogin = facebookLogin;

var facebookLoginCallback =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_, __, profile, cb) {
    var _profile$_json2, id, name, email, user, newUser;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            //console.log(profile);
            _profile$_json2 = profile._json, id = _profile$_json2.id, name = _profile$_json2.name, email = _profile$_json2.email;
            _context3.prev = 1;
            _context3.next = 4;
            return _User["default"].findOne({
              email: email
            });

          case 4:
            user = _context3.sent;

            if (!user) {
              _context3.next = 11;
              break;
            }

            console.log("facebookLoginCallback find user");
            user.facebookId = id;
            user.avatarUrl = "https://graph.facebook.com/".concat(id, "/picture?type=large");
            user.save();
            return _context3.abrupt("return", cb(null, user));

          case 11:
            console.log("facebookLoginCallback: not find user, will create");
            _context3.next = 14;
            return _User["default"].create({
              email: email,
              name: name,
              facebookId: id,
              avatarUrl: "https://graph.facebook.com/".concat(id, "/picture?type=large")
            });

          case 14:
            newUser = _context3.sent;
            return _context3.abrupt("return", cb(null, newUser));

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", cb(_context3.t0));

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 18]]);
  }));

  return function facebookLoginCallback(_x8, _x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

exports.facebookLoginCallback = facebookLoginCallback;

var postFacebookLogin = function postFacebookLogin(req, res) {
  res.redirect(_routes["default"].home);
};

exports.postFacebookLogin = postFacebookLogin;

var logout = function logout(req, res) {
  console.log("logout");
  req.logout();
  res.redirect(_routes["default"].home);
};

exports.logout = logout;

var getMe =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _User["default"].findById(req.user._id).populate("videos");

          case 2:
            user = _context4.sent;
            //const user_video = req.user.populate("videos");
            console.log(user);
            res.render("userDetail", {
              pageTitle: "User Detail",
              user: user
            });

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getMe(_x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getMe = getMe;

var userDetail =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id; //console.log(req);

            _context5.prev = 1;
            _context5.next = 4;
            return _User["default"].findById(id).populate("videos");

          case 4:
            user = _context5.sent;
            console.log(user.videos);
            res.render("userDetail", {
              pageTitle: "User Detail",
              user: user
            });
            _context5.next = 12;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](1);
            res.redirect(_routes["default"].home);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 9]]);
  }));

  return function userDetail(_x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.userDetail = userDetail;

var getEditProfile = function getEditProfile(req, res) {
  return res.render("editProfile", {
    pageTitle: "Edit Profile"
  });
};

exports.getEditProfile = getEditProfile;

var postEditProfile =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$body2, name, email, location;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, location = req.location;
            _context6.prev = 1;
            _context6.next = 4;
            return _User["default"].findByIdAndUpdate(req.user.id, {
              name: name,
              email: email,
              avatarUrl: location ? location.path : req.user.avatarUrl
            });

          case 4:
            res.redirect(_routes["default"].me);
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](1);
            res.redirect(_routes["default"].editProfile);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 7]]);
  }));

  return function postEditProfile(_x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();

exports.postEditProfile = postEditProfile;

var getChangePassword = function getChangePassword(req, res) {
  return res.render("ChangePassword", {
    pageTitle: "Change Password"
  });
};

exports.getChangePassword = getChangePassword;

var postChangePassword =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    var _req$body3, oldPassword, newPassword, newPassword1;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$body3 = req.body, oldPassword = _req$body3.oldPassword, newPassword = _req$body3.newPassword, newPassword1 = _req$body3.newPassword1;
            _context7.prev = 1;

            if (!(newPassword !== newPassword1)) {
              _context7.next = 7;
              break;
            }

            console.log("different password");
            res.status(400);
            res.redirect("/users".concat(_routes["default"].changePassword));
            return _context7.abrupt("return");

          case 7:
            console.log("change password");
            _context7.next = 10;
            return req.user.changePassword(oldPassword, newPassword);

          case 10:
            res.redirect(_routes["default"].me);
            _context7.next = 17;
            break;

          case 13:
            _context7.prev = 13;
            _context7.t0 = _context7["catch"](1);
            res.status(400);
            res.redirect("/users".concat(_routes["default"].changePassword));

          case 17:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 13]]);
  }));

  return function postChangePassword(_x18, _x19) {
    return _ref7.apply(this, arguments);
  };
}();

exports.postChangePassword = postChangePassword;