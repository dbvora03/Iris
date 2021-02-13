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