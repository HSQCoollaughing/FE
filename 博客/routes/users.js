var express = require('express');
var router = express.Router();
var models = require('../models');
var util = require('../util');
var auth = require('../middleware/check');

router.get('/reg', auth.checkNotLogin, function(req, res) {
    res.render('user/reg');
});

// 提交注册
router.post('/reg', auth.checkNotLogin, function (req, res) {
    var user = req.body;

    if (user.password != user.repassword) {
        res.redirect('back');
    } else {
        req.body.password = util.md5(req.body.password);
        // 增加一个用户头像
        req.body.avatar = 'https://secure.gravatar.com/avatar/' + util.md5(req.body.email) + '?s=48';

        models.User.create(req.body, function (err, doc) {
            if (err) {
                req.flash('error', '用户注册失败!');
                res.redirect('back');
            } else {
                req.flash('success', '用户注册成功');
                res.redirect('/user/login');
            }
        });
    }
});

router.get('/login', auth.checkNotLogin, function (req, res) {
    res.render('user/login');
});

// 登录
router.post('/login', auth.checkNotLogin, function (req, res) {
    var user = req.body;
    user.password = util.md5(user.password);

    models.User.findOne({username: user.username, password: user.password}, function (err, doc) {
        if (err) {
            req.flash('error', '用户登录失败!');
            res.redirect('back');
        } else {
            if (doc) {  // 登录成功,跳到首页
                req.session.user = doc;
                req.flash('success', '用户登录成功');
                res.redirect('/');
            } else {
                req.flash('error', '用户登录失败!')
                res.redirect('back');
            }
        }
    });
});

router.get('/logout', auth.checkLogin, function (req, res) {
    req.session.user = null;
    req.flash('success', '用户已退出');
    res.redirect('/');
});

module.exports = router;
