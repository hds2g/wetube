import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL_PROD, {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

const handlOpen = () => console.log("✅ Connected to DB");
const handleError = () => console.log(`❌ Error on DB Connection: ${error}`);
db.once("open", handlOpen);
db.on("error", handleError);
