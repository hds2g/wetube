const express = require("express");
const app = express();

const PORT = 4000;
const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
};

const handleHome = (req, res) => {
  console.log(req);
  res.send("hello from home");
};

function handleProfile(req, res) {
  res.send("Profile!");
}

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
