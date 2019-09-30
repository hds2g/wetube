import express from "express";
import routes from "../routes";

import { postRegisterView } from "../controller/videoController";

export const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);

export default apiRouter;
