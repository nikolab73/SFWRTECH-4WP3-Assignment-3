const express = require('express');
var router = express.Router();
const UsersModel = require('../models/users.js');
const ArticlesModel = require('../models/articles.js');

router.get("/", async function(req, res) {
    req.TPL.users = await UsersModel.getAllUsers();
    req.TPL.articles = await ArticlesModel.getAllArticles();
    res.render("editors", req.TPL);
});

router.get("/deleteArticle/:title/:username", async function(req, res) {
    await ArticlesModel.deleteArticle(req.params.title, req.params.username);
    res.redirect("/editors");
});

router.get("/deleteUser/:username", async function(req, res) {
    await ArticlesModel.deleteByUser(req.params.username);
    await UsersModel.deleteUser(req.params.username);
    res.redirect("/editors");
});

module.exports = router;