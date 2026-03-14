const express = require('express');
var router = express.Router();
const UsersModel = require('../models/users.js');
const ArticlesModel = require('../models/articles.js');

router.get("/", async function(req, res) {
    req.TPL.users = await UsersModel.getAllUsers();
    req.TPL.articles = await ArticlesModel.getAllArticles();
    res.render("editors", req.TPL);
});

module.exports = router;