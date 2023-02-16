const express = require("express");
var cors = require('cors');
const dotenv = require('dotenv');
const colors = require("colors");
const PORT = 1337;
const connectDB =require("./config/connection");
const authRoute = require("./routes/userRoutes");
const entryRoute = require("./routes/entryRoutes")
const path = require("path");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config( { path : '.env'} )
connectDB();


app.use("/", authRoute);
app.use("/api/v1", entryRoute);


app.use((req, res, next) => {
    res.removeHeader('x-powered-by');
    res.header('Access-Control-Allow-Origin', 'http://localhost:1337');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
});



const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));



app.listen(PORT);