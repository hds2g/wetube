import "@babel/polyfill";
import "./db";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

// imports the file
import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
