var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.dbUrl); //连接数据库

exports.User = mongoose.model('user', new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    avatar: String
}));


exports.Article = mongoose.model('article', new mongoose.Schema({
    // 是一个对象ID类型,引用用户模型
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    title: String,
    content: String,
    poster: String, // 增加图片字段
    timestamp: {type: Date, default: Date.now()}
}));