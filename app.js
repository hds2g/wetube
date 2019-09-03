//const express = require("express");
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./router.js";

const app = express();

const handleHome = (req, res) => {
  //console.log(req);
  res.send("hello from home");
};

function handleProfile(req, res) {
  res.send("Profile!!!!");
}

//app.use(morgan("tiny"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());

/*
const middleware = (req, res, next) => {
  res.send("not happening"); // disconnet middleware
};
*/

//app.get("/",betweenHome, handleHome);
app.get("/", handleHome);

app.get("/profile", handleProfile);

app.use("/user", userRouter);

export default app;
