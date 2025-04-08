import express from "express";
import { initMongoDB } from "./database.js";
import config from "./config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = config.PORT;

initMongoDB()
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((error) => {
    console.log(`ERROR => ${error}`);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT} in ${config.ENV} mode`);
});
