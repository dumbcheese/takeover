var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var moment = require("moment");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


//ROUTES
app.get("/", function(req, res){
    res.render("index");
});


//SERVER
app.listen("3000", function(){
    console.log("takeover initiated, adi krpo ded");
})