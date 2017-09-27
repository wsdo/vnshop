var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods')
mongoose.connect('mongodb://localhost:27017/shop');

mongoose.connection.on('connected', function() {
    console.log("mongondb connected success");
})

mongoose.connection.on('error', function() {
    console.log("mongondb connected fail");
})

mongoose.connection.on('disconnected', function() {
    console.log("mongondb connected disconnected");
})

router.get("/list", function(req, res, next) {
    let sort = req.param('sort');
    let goodModel = Goods.find({}).sort({ 'salePrice': sort });
    goodModel.exec({}, function(err, doc) {
        res.json({ status: 0, result: doc })
    })
})

module.exports = router;