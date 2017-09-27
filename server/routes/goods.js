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
    let priceLevel = req.param('priceLevel');
    let priceGt = '',
        priceLte = '';

    let param = {};

    if (priceLevel != 'all') {
        // switch (priceLevel) {
        //     case '0':
        //         priceGt = 0;
        //         priceLte = 100;
        //         break;
        //     case '1':
        //         priceGt = 100;
        //         priceLte = 500;
        //         break;
        //     case '2':
        //         priceGt = 500;
        //         priceLte = 1000;
        //         break;
        //     case '3':
        //         priceGt = 1000;
        //         priceLte = 5000;
        //         break;
        // }

        // 表驱动法
        let priceItem = [
            [0, 100],
            [100, 500],
            [500, 1000],
            [1000, 5000]
        ];
        param = {
            salePrice: {
                // $gt: priceGt,
                // $lte: priceLte
                $gt: priceItem[priceLevel][0],
                $lte: priceItem[priceLevel][1]
            }
        }
    }


    let goodModel = Goods.find(param).sort({ 'salePrice': sort });
    goodModel.exec({}, function(err, doc) {
        res.json({ status: 0, result: doc })
    })
})

module.exports = router;