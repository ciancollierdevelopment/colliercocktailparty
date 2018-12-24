const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const Order = require('./models/Order');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")));

const port = process.env.PORT || 5000;

mongoose.connect(config);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/api/add', (req, res) => {
  console.log("recieved");
  let item = new Order({cocktail: req.body.order, name: req.body.name});
  item.save((err) => {
    console.log(err);
  });

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS
    }
  });

  let mail = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: req.body.name + " Submitted Their Cocktail Order",
    text: req.body.name + " chose " + req.body.order
  }

  transporter.sendMail(mail, (err, info) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Email sent!");
    }
  });

  res.send(200);
});

app.get('/seeorders', (req, res) => {
  Order.find((err, results) => {
    let response = "<ul>";

    for (let i = 0; i < results.length; i++) {
      response += "<li><strong>Name: </strong>";
      response += results[i].name;
      response += " <strong>Order: </strong>";
      response += results[i].cocktail;
      response += "</li>";
    }

    response += "</ul>";
    res.send(response);
  })
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port);
