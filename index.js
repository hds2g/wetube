//const express = require("express");
import express from "express";
const app = express();

const PORT = 4000;
const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
};

const handleHome = (req, res) => {
  console.log(req);
  res.send("hello from home");
};

const betweenHome = (req, res, next) => {
  console.log("I'm between");
  next();
};

function handleProfile(req, res) {
  res.send("Profile!!!!");
}

app.use(betweenHome);

//app.get("/",betweenHome, handleHome);
app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
