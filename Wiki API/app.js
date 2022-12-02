const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

///////////////////////////////////// All articles /////////////////////////////////

app.route("/articles")

    .get((req, res) => {
        Article.find((err, foundArticles) => {
            if (!err) {
                res.send(foundArticles);
            }
            else {
                res.send(err);
            }
        });
    })

    .post(function (req, res) {
        const newArticle = Article({
            title: req.body.title,
            content: req.body.content
        });

        newArticle.save(function (err) {
            if (!err) {
                res.send("Successfully added a new article.");
            } else {
                res.send(err);
            }
        });
    })

    .delete((req, res) => {
        Article.deleteMany(function (err) {
            if (!err) {
                res.send("Successfully deleted all the articles in wikiDB.");
            } else {
                res.send(err);
            }
        });

    });

///////////////////////////////////// Specific article /////////////////////////////////

app.route("/articles/:articleTitle")

    .get((req, res) => {
        const articleTitle = req.params.articleTitle;
        Article.findOne({ title: articleTitle }, (err, foundArticle) => {
            if (!err) {
                res.send(foundArticle);
            }
            else {
                res.send("No article with that title found.");
            }
        });
    })

    // .put((res, req) => {
    //     const articleTitle = req.params.articleTitle;
    //     Article.replaceOne({ title: articleTitle }, { title: req.body.title, content: req.body.content }, { overwrite: true }, (err) => {
    //         if (!err) {
    //             res.send("Successfully updated the content of the selected article.");
    //         }
    //         else {
    //             res.send(err);
    //         }
    //     });
    // });

    .put(function (req, res) {

        const articleTitle = req.params.articleTitle;

        Article.replaceOne(
            { title: articleTitle },
            { content: req.body.content, title: req.body.title },
            { overwrite: true },
            function (err) {
                if (!err) {
                    res.send("Successfully updated the content of the selected article.");
                } else {
                    res.send(err);
                }
            });
    })

    .patch((req, res) => {
        Article.updateOne({ title: req.params.articleTitle },
             { $set: req.body }, (err) => {
            if (!err) {
                res.send("Successfully patched article.");
            } else {
                res.send(err);
            }
        });
    })

    .delete((req, res) => {
        Article.deleteOne({title: req.params.articleTitle}, (err) => {
            if (!err) {
                res.send("Successfully deleted article.");
            } else {
                res.send(err);
            }
        });
    });

app.listen(3000, () => {
    console.log("Server started on port 3000");
});