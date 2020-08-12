const db = require("../models");
const scrape = require("../scripts/scrape");

module.exports = {
    scrapeHeadlines: (req, res) => {
        return scrape()
            .then(function (articles) {
                return db.Headline.create(articles);
            })
            .then(function (dbHeadline) {
                if (dbHeadline.length === 0) {
                    res.json({
                        message: "No new articles added today."
                    });
                }
                else {
                    res.json({
                        message: dbHeadline.length + " new articles added."
                    });
                }
            })
            .catch(function (err) {
                res.json({
                    message: "Headlines scraped"
                });
            });
    }
}