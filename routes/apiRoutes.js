const router = require("express").Router();
const cheerio = require("cheerio");
const got = require("got");
const mongoose = require("mongoose");
const Headlines = mongoose.model("Headlines");

router.get("/scrape", async (req, res) => {
    try {
        const response = await got("https://www.nintendo.com/");
        console.log(response.body);
        const $ = cheerio.load(response.body);

        var results = [];

        $("game-tile").each(function (i, element) {

            const title = $(element).attr("image-alt");
            const link = $(element).attr("href");
            const date = $(element).attr("date");
            const platform = $(element).attr("platform");

            results.push({
                title: title,
                link: link,
                date: date,
                platform: platform,
            });
        });

    } catch (error) {
        console.log(error.response.body);
    }
    Headlines.insertMany(results).then(() => {
        console.log("data successfully inserted");
    }).catch(() => {
        console.log("data unsuccessfully inserted");
    });
    res.json(results);
});

router.put("/saved", async (req, res) => {
    const title = await db.title.findOne({ _id: req.params.id });
    title.saved = !title.saved;
    await title.save();
    return res.status("200").send(title);
});

router.get("/saved", async (req, res) => {
    const titles = await db.title.find({ saved: true }).populate('comments');
    return res.status("200").send(titles);
});

router.delete("/saved", async (req, res) => {
    const title = await db.title.deleteOne({ _id: req.params.id});
    return res.json(title);
});

router.get("/", (req, res) => {
    res.sendStatus(200);
})

module.exports = router;