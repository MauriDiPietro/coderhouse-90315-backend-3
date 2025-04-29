import express from "express";

const app = express();

app.get("/operacion-simple", (req, res) => {
  let sum = 0;
  for (let i = 0; i < 10000; i++) {
    sum += i;
  }
  res.json({
    sum,
    pid: process.pid,
  });
});

app.get("/operacion-compleja", (req, res) => {
  let sum = 0;
  for (let i = 0; i < 500000; i++) {
    sum += i;
  }
  res.json({
    sum,
    pid: process.pid,
  });
});

app.get("/", (req, res) => {
  res.send("Hola Docker!");
});

const PORT = 8080;

app.listen(PORT, () =>
  console.log(
    `Servidor express escuchando en el puerto ${PORT} - PID ${process.pid}`
  )
);
