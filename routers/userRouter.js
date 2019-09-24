import express from "express";
import routes from "../routes";

import {
  userDetail,
  changePassword,
  getEditProfile
} from "../controller/userController";
import { onlyPrivate } from "../middlewares";

export const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile); // have to be over userDetail
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
