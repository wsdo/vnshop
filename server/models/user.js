var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    "userId": String,
    "userName": String,
    "orderList": Array,
    "cartList": Array,
    "cartList": [{
        "productId": String,
        "productName": String,
        "salePrice": Number,
        "productImage": String,
        "productUrl": String,
        "productNum": Number,
        "checked": String
    }],
    "addressList": []
})

module.exports = mongoose.model('user', userSchema);