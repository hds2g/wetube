import express from "express";
import routes from "../routes";
import { home, search } from "../controller/videoController";
import {
  getLogin,
  postLogin,
  getJoin,
  postJoin,
  logout
} from "../controller/userController";
import { onlyPublic } from "../middlewares";

export const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.logout, onlyPublic, logout);

export default globalRouter;
