import "@babel/polyfill";

//const express = require("express");
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import path from "path";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import flash from "express-flash";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express();

const CoockieStore = MongoStore(session);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//app.use("/uploads", express.static("uploads"));
app.use("/static", express.static(path.join(__dirname, "static")));
//app.use(morgan("tiny"));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CoockieStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
