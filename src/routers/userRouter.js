import express from "express";
import routes from "../routes";

import {
  userDetail,
  getChangePassword,
  getEditProfile,
  postEditProfile,
  postChangePassword
} from "../controller/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

export const userRouter = express.Router();

userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
