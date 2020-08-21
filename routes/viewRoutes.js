const router = require("express").Router();
const mongoose = require("mongoose");
const headline = require("../controllers/headline");
const Headlines = mongoose.model("Headlines");

router.get("/", (req, res) => {
    Headlines.find().lean().then(data => {
        console.log("data", data)
        let newsHeadlines = {
            articles: data
        };
        res.render("index", newsHeadlines)
    }).catch(err => {
        res.sendStatus(404)
    });
});

router.get("/saved", (req, res) => {
    res.render("saved")
});

module.exports = router;