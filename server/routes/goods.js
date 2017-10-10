var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods')
var User = require('../models/user')
mongoose.connect('mongodb://47.93.231.75:27017/shops');

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

    console.log(param);

    let currentPage = (parseInt(req.param('page')) > 0) ? parseInt(req.param('page')) : 1; //第几页
    let pagesize = (parseInt(req.param('pagesize')) > 0) ? parseInt(req.param('pagesize')) : 8; //每页显示多少条

    let skip = (currentPage - 1) * pagesize;

    // 数据库一共有17条数据 每页显示8条 第二页 从第九条开始 limit 从第9条起数8条为止 这个8就是limit

    let goodModel = Goods.find(param).sort({ 'salePrice': sort }).skip(skip).limit(pagesize);
    goodModel.exec({}, function(err, doc) {
        res.json({ status: 0, result: doc })
    })
})

router.post('/addCart', function(req, res, next) {
    // 查询用哪个用户， 确定好用户
    let userId = '100000077';
    // 商品id
    var productId = req.body.productId;
    // console.log(productId);
    User.findOne({ userId: userId }, function(err, userDoc) {
        // console.log(userDoc);
        // 通过商品id去数据库查询， 把商品的信息查出来，

        let goodItem = '';
        userDoc.cartList.forEach(function(item) {
            if (item.productId == productId) {
                // 此时表示在购物车列表存在这个商品
                goodItem = item;
                item.productNum++;
            }
        })

        // 如果不是第一次加入购物车
        if (goodItem) {
            userDoc.save(function(err3, doc3) {
                if (err3) {
                    res.json({ status: "1", msg: err3.message })
                } else {
                    res.json({ status: 0, msg: '', result: '商品数量添加成功！' })
                }
            })
        } else {
            // 商品第一次加入购物车
            // 怎么判断是第一次加入购物车还是购物车里面已经有了
            Goods.findOne({ 'productId': productId }, function(err1, goodDoc) {
                console.log(goodDoc);
                console.log(productId);
                goodDoc.productNum = 1;
                goodDoc.checked = 1;
                // 此时去查询这个商品是否存在于用户购物车列表里面

                userDoc.cartList.push(goodDoc);
                userDoc.save(function(err2, doc2) {
                    if (err2) {
                        res.json({ status: 1, msg: err2.message })
                    } else {
                        res.json({ status: 0, msg: '', result: "加入购物车成功" })
                    }
                })
            })
        }


    })

    // 如果存在则商品数量加一， 不存在把整个商品信息存到里面
    // 然后存到这个用户里面

})
module.exports = router;