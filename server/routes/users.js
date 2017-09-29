var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
    let param = {
            userName: req.body.userName,
            userPwd: req.body.userPwd
        }
        // 把用户名和密码，去数据库查询，看看是否存在
    User.findOne(param, function(err, doc) {
        if (err) { res.json({ status: 1, msg: '用户名或密码错误' }) } else {
            res.cookie('userId', doc.userId, {
                path: '/',
                maxAge: 1000 * 60 * 60
            })

            res.cookie('userName', doc.userName, {
                path: '/',
                maxAge: 1000 * 60 * 60
            })


            if (doc) {
                res.json({
                    status: 0,
                    msg: '',
                    result: {
                        userName: doc.userName
                    }
                })
            }
        }
    })
})


router.post("/checkLogin", function(req, res, next) {
    if (req.cookies.userId) {
        res.json({
            status: '0',
            result: req.cookies.userName
        })
    } else {
        res.json({
            status: 1,
            msg: '未登录',
            result: ''
        })
    }
})


router.post('/logout', function(req, res, next) {
    res.cookie('userId', "", {
        path: '/',
        maxAge: -1
    });

    res.json({
        status: 0,
        msg: '',
        result: "退出成功"
    })
})
module.exports = router;