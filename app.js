const express = require("express");
var cors = require('cors')
const PORT = 1337;
const app = express();
const connectDB =require("./db/connection");
const authRoute = require("./api/routes/auth");
const path = require("path");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();


app.use(function(req, res, next) {
   res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      next();
});

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use("/", authRoute);

app.listen(PORT);