import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controller/videoController";
import {
  getLogin,
  postLogin,
  getJoin,
  postJoin,
  logout,
  githubLogin,
  postGithubLogin,
  getMe,
  facebookLogin,
  postFacebookLogin
} from "../controller/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

export const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
  routes.gitHubLoginCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);

globalRouter.get(routes.me, getMe);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
  routes.facebookLoginCallback,
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  postFacebookLogin
);

export default globalRouter;
