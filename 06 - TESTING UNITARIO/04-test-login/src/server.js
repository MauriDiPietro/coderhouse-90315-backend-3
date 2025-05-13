import "dotenv/config";
import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "./passport/jwt.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import MainRouter from "./routes/index.js";
const mainRouter = new MainRouter();

const app = express();

app
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(morgan("dev"))
  .use(cookieParser())
  .use("/api", mainRouter.getRouter())
  .use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server OK PORT: ${PORT}`));
