const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const https = require("https");
const request = require("request");
const mongoose = require("mongoose");
const { render } = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));


// GET REQ
app.get("/" , function(req , res){
    res.sendFile(__dirname + "/views/home.html");
});
app.get("/login" , function(req , res){
    res.sendFile(__dirname + "/views/login.html");
});

const Port = process.env.PORT || 3000;

app.listen(Port, function () {
    console.log("server running");
});
