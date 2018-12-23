const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const Order = require('./models/Order');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
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
