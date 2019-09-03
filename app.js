//const express = require("express");
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";
import globalRouter from "./routers/globalRouter.js";

const app = express();

//app.use(morgan("tiny"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

export default app;
