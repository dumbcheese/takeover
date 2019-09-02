var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var moment = require("moment");
var paypal = require("paypal-rest-sdk");
var nodeMailer = require("nodemailer");
var ejs = require("ejs");



// mongoose.connect("mongodb://localhost/ibessays", {useNewUrlParser: true});

paypal.configure({
    'mode': 'live', //sandbox or live
    'client_id': 'AZ0S5GsrOVqf_X-2h-SRElrJ6RMqLtnfFiT5LYhwjUTj5GvfuzDLbMG_nCgWYiR4Fm-kMxBbeqOYv2sH',
    'client_secret': 'EAKG7w6NUoHTSQ0hxB4RzrobGTYFqIAn1GgabDU3uiUj-sGjGYKym3kXooFT_PATE7TFZRZOOd9hkakE'
  });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));



//ROUTES
app.get("/", function(req, res){
    res.render("index");
});

var order={
    email: "",
    type:"",
    subject: "",
    level: "",
    deadline: "",
    title: "",
    specifications: "",
    price: ""
};

app.post("/pay", function(req, res){
    //POPULATE order objekt za kasniju upotrebu
    order.email = req.body.orderEmail;
    order.type= req.body.orderType;
    order.subject = req.body.orderSubject;
    order.level = req.body.orderLevel;
    order.deadline = req.body.orderDeadline;
    order.title = req.body.orderTitle;
    order.specifications = req.body.orderSpecifications;
    order.price = req.body.orderPrice1;

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
                    "name": order.type + " "  + order.subject,
                    "sku": "001",
                    "price": order.price,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": order.price,
            },
            "description": order.title + " " + order.specifications
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



// var template = ejs.renderFile(__dirname + "/views/email-template.ejs", {order: order});

app.get("/success", function(req, res){ 
    var payerId = req.query.PayerID;
    var paymentId = req.query.paymentId; 
    
    var execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": order.price
            }
        }]
      };
    
      paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            res.render("success", {order: order});

            //SENDING MAIL
            let transporter = nodeMailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    // should be replaced with real sender's account
                    user: 'damir.h552@gmail.com',
                    pass: 'SevenSamurai'
                }
            });
            ejs.renderFile(__dirname + "/views/email-template.ejs", {order: order}, function(err, data){
                if(err){
                    console.log(err);
                } else{
                    let mailOptions = {
                        // should be replaced with real recipient's account
                        to: 'damir.h552@gmail.com',
                        subject: order.title,
                        html: data
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    });
                }
            });
            // let mailOptions = {
            //     // should be replaced with real recipient's account
            //     to: 'damir.h552@gmail.com',
            //     subject: order.title,
            //     html: template
            // };
            // transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //         return console.log(error);
            //     }
            //     console.log('Message %s sent: %s', info.messageId, info.response);
            // });
            
        }
    });
});

app.get("/cancel", function(req, res){
    res.send("Your order was cancelled for some reason. Please try again or contact info@ibessay.net.")
});

//SERVER
app.listen("3000", function(){
    console.log("takeover initiated, adi krpo ded");
})