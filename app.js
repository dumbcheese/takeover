var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var moment = require("moment");
var paypal = require("paypal-rest-sdk");

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AZ42Vd2GFRL77poyzElylkxyXA2PyjhhPS_beeOnzzIMJ7N9sOumYGnqxufGwry81owiwg5V3lB0h5U-',
    'client_secret': 'EOXfpBJpJ_K2wJmPZoUJScp7j88G-Pbp9R3j8yxZBrakTpI1oj-OShrS9Z0uEcS9TO_gfbQFSnWJFYOR'
  });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


//ROUTES
app.get("/", function(req, res){
    res.render("index");
});


app.post("/pay", function(req, res){
    var price = req.body.price;
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Esej1",
                    "sku": "001",
                    "price": "20",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "20",
            },
            "description": "AAaaa"
        }]
    };
    
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(var i=0; i<payment.links.length; i++){
                if(payment.links[i].rel ==="approval_url"){
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
});

app.get("/success", function(req, res){
    var payerId = req.query.PayerID;
    var paymentId = req.query.paymentId; 
    
    var execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "20"
            }
        }]
      };
    
      paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            res.send('Success');
        }
    });
});

//SERVER
app.listen("3000", function(){
    console.log("takeover initiated, adi krpo ded");
})