var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: ' stark' });
});

router.get('/stark', function(req, res, next) {
    res.json({ 'name': 'stark' });
});

module.exports = router;