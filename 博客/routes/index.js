var express = require('express');
var router = express.Router();
var model = require('../models');
var markdown = require('markdown').markdown;

/* GET home page. */
router.get('/', function(req, res, next) {
    // 先查找 然后把user字符串转成user对象
    var keyword = req.query.keyword;
    var queryObj = {};
    if (keyword) {
        var reg = new RegExp(keyword, 'i');
        queryObj = {$or: [{title: reg}, {content: reg}]};
        req.session.keyword = keyword;
    }
    model.Article.find(queryObj).populate('user').exec(function (err, articles) {
        articles.forEach(function (item) {
            item.content = markdown.toHTML(item.content);
        });
        res.render('index', { articles: articles });
    });
});

module.exports = router;
