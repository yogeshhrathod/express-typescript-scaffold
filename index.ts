import express from "express";
import Config from "./src/config/config";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});



app.listen(Config.port, () => {
  console.log(`Express with Typescript! http://localhost:${Config.port}`);
});
