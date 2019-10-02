"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.apiRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoController = require("../controller/videoController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiRouter = _express["default"].Router();

exports.apiRouter = apiRouter;
apiRouter.post(_routes["default"].registerView, _videoController.postRegisterView);
apiRouter.post(_routes["default"].addComment, _videoController.postAddComment);
var _default = apiRouter;
exports["default"] = _default;