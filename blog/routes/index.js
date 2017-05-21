/* GET home page. */
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
};