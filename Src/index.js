const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const routes = require("./Routes/route")
const app = express();
const appRoute = require("./Routes/route");

require("dotenv").config();

const PORT = process.env.PORT||5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.json());


const connectDB = require('../Mongoose');
connectDB()

app.use('/',appRoute);

app.get('/',(req,res)=>{
    res.send('Hello everyone, Your name');
})

app.listen(PORT, ()=>{
    console.log(`Server is runing on http://localhost:${PORT}`)
})
