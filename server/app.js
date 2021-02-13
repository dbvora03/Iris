//Import 
require("dotenv").config();
const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const passport=require("passport");
const axios=require("axios");


//
const app=express();
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017//dbname",{useNewUrlParser:true,useUnifiedTopology:true});



app.post("/",(req,res)=>{

})






app.listen(process.env.PORT||3000,()=>{
    console.log("app currently running on port 3000");
})