const mongoose = require ("mongoose");

var HeadlinesSchema = new mongoose.Schema({
    title: String,
    link: String,
    date: String,
    platform: String
});

mongoose.model("Headlines", HeadlinesSchema)