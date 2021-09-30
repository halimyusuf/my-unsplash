import mongoose from "mongoose";
import logger from "../utils/logger";
import ENVS from "./process.env";

async function intializeDB() {
  try {
    await mongoose.connect(ENVS.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    logger("Connected to db");
  } catch (error) {
    logger(error);
  }
}

export default intializeDB;
