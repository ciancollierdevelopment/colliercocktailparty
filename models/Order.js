const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    cocktail: String,
    name: String
});

module.exports = mongoose.model('Order', Order);
