// 必须登录后才可访问
exports.checkLogin = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.flash('error', '必须登录后才能访问哦!');
        res.redirect('/user/login');
    }
};

// 登录后不能访问
exports.checkNotLogin = function (req, res, next) {
    if (req.session.user) {
        req.flash('error', '登录后不能访问了~~~');
        res.redirect('/');
    } else {
        next();
    }
};