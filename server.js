const express = require("express");
const expresshbs = require("express-handlebars");
const mongoose = require("mongoose");
const logger = require("morgan");
const cheerio = require("cheerio");
const axios = require("axios");
const got = require("got");
const path = require("path");

require("./models/Headlines.js");

const PORT = process.env.PORT || 3308;
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine('hbs', expresshbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layouts: path.join(__dirname, 'views/layouts'),
    partials: path.join(__dirname, 'views/partials'),
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
    },
}));
app.set('view engine', 'hbs');

axios.defaults.baseURL = process.env.baseURL || "http://localhost:3308";

app.use(require("./routes"));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsScraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false });

app.listen(PORT, function () {
    console.log("Now you're playing with power on " + PORT);
});