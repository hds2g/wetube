import express from "express";
import routes from "../routes";

import {
  userDetail,
  editProfile,
  changePassword
} from "../controller/userController";

export const userRouter = express.Router();

userRouter.get(routes.editProfile, editProfile); // have to be over userDetail
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
