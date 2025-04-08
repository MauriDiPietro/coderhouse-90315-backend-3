import { connect } from "mongoose";
import config from "./config.js";

export const initMongoDB = async () => {
  try {
    await connect(config.MONGO_URL);
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
};
