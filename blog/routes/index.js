/* GET home page. */
var mongoose = require('mongoose');
var User = require('./../models/user.model');
module.exports = function (app) {

    app.get("/", function (req, res) {

        res.render("index", {
            title: "首页",
            blogName: "harsbog个人博客系统"
        })
    });
    app.get("/reg", function (req, res) {

        res.render("reg", {
            title: "注册"
        })
    });
    app.get("/login", function (req, res) {

        res.render("login", {
            title: "登录"
        })
    });
    app.get("/post", function (req, res) {

        res.render("post", {
            title: "发表文章"
        })
    });
    app.post('/reg', function (req, res) {
        var user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        if (req.body['password'] != req.body['password-repeat']) {

            //req.flash("error",'两次输入的密码不一致');
            console.log('两次输入的密码不一致');
            return res.redirect('/');//返回注册页
        }
        User.findOne({'username': user.username}, function (err, data) {
            if (err) {
                req.flash("err", err);
                return res.redirect('/');
            }
            if (data != null) {
                // req.flash('error','该用户已存在');
                console.log('该用户已存在');
                return res.redirect('/reg');//返回注册页
            } else {  //保存新的用户
                user.save(function (err) {
                    if (err) {
                        //req.flash('err',err);
                        console.log(err);
                        return res.redirect('/');
                    }
                    //req.flash('success', '注册成功!');
                    console.log('注册用户成功');
                    res.redirect('/');//注册成功后返回主页
                })
            }
        })
    });

    app.post('/login', checkNoLogin, function (req, res) {
        var password = req.body.password;
        //检查用户是否存在
        User.findOne({'username': req.body.username}, function (err, user) {
            if (err) {
                console.log('error', '登录出错');
                req.flash('error', '登录出错');
                return res.redirect('/');
            }
            //用户不存在
            if (!user) {
                console.log('error', '用户不存在');
                req.flash('error', '用户不存在');
                return res.redirect('/login');
            }
            //判断密码是否一致
            if (user.username != password) {
                console.log('error', '密码错误');
                req.flash('error', '密码错误');
                return res.redirect('/');
            }  //用户名密码都匹配后，将用户信息存入 session
            req.session.user = user;
            console.log(user.username);
            req.flash('success', '登录成功');
            res.redirect('/');
        });
    });
    //退出登录
    app.get('/logout',checkLogin,function (req, res) {
        req.session.user = null;
        req.flash('success', '登出成功!');
        res.redirect('/');//登出成功后跳转到主页
    });
};