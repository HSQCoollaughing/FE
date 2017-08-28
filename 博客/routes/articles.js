var express = require('express');
var router = express.Router();
var auth = require('../middleware/check');
var model = require('../models');
var multer = require('multer');
// 指定存储目录和文件名
var storage = multer.diskStorage({
    // 目标路径
    destination: function (req, file, cb) {
        cb(null, '../public/uploads');
    },
    // 文件名
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + (file.mimetype.slice(file.mimetype.indexOf('/') + 1)));
    }
});

var upload = multer({ storage: storage });

router.get('/add', auth.checkLogin, function (req, res) {
    res.render('article/add');
});

router.post('/add', auth.checkLogin, upload.single('imgs'), function (req, res) {
    var article = req.body;
    if (req.file) {
        article.poster = '/uploads/' + req.file.filename;
    }
    // 把当前
    article.user = req.session.user._id;
    model.Article.create(article, function (err, doc) {
        if (err) {
            req.flash('errror', '文章发表失败!');
        } else {
            req.flash('success', '文章发表成功');
            res.redirect('/');
        }
    });
});

module.exports = router;