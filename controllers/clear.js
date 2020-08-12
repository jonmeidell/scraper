const db = require("../models");

module.exports = {
    clear: (req, res) => {
        db.Headline.remove({})
        .then(function() {
            return db.Note.remove({});
        })
        .then(function() {
            res.json({ ok: true});
        });
    }
};