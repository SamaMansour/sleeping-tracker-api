const express = require("express");
const PORT = 1337;
const app = express();
require("./db/connection");
const authRoute = require("./api/routes/auth");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Header", "*");

  next();
});

app.use("/api/v1/user", authRoute);

app.listen(PORT);