import dotenv from "dotenv";

const ENV = process.argv[2] || "development";

dotenv.config({ path: ENV === "staging" ? "./.env.stg" : ".env.dev" });

export default {
  ENV,
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
};
