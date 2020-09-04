const router = require("express").Router();

$(document).ready(function () {
    const articleContainer = $(".article-container");
    $(document).on("click", ".btn.delete", deleteArticle);
    $(".clear").on("click", clearSavedArticles);

    function initPage() {
        $.get("/api/headlines?saved=true").then(function (data) {
            articleContainer.empty();
            if (data && data.length) {
                renderArticles(data);
            } else {
                renderEmpty();
            }
        });
    };

    function renderArticles(articles) {
        var articleCards = [];
        for (let i = 0; i < articles.length; i++) {
            articleCards.push(createCard(articles[i]));
        }
        articleContainer.append(articleCards);
    };

    function createCard(article) {
        const card = $("<div class='card'>");
        const cardHeader = $("<div class='card-header'>").append(
            $("<h3>").append(
                $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
                    .attr("href", article.url)
                    .text(article.headline),
                $("<a class='btn btn-danger delete'>Delete From Saved</a>"),
            )
        );

        const cardBody = $("<div class='card-body'>").text(article.summary);

        card.append(cardHeader, cardBody);
        card.data("_id", article._id);
        return card;
    };

    function renderEmpty() {
        var emptyAlert = $(
            [
                "<div class='alert alert-warning text-center'>",
                "<h4>Nothing here. It looks like you haven't any saved articles yet.</h4>",
                "</div>",
                "<div class='card'>",
                "<div class='card-header text-center'>",
                "<h3>Would You Like to Browse Available Articles?</h3>",
                "</div>",
                "<div class='card-body text-center'>",
                "<h4><a href='/'>Browse Articles</a></h4>",
                "</div>",
                "</div>"
            ].join("")
        );
        articleContainer.append(emptyAlert);
    };

    function deleteArticle() {
        const articleToDelete = $(this)
            .parents(".card")
            .data();
        $(this)
            .parents(".card")
            .remove();
        $.ajax({
            method: "DELETE",
            url: "/api/headlines/" + articleToDelete._id
        }).then(function (data) {
            if (data.ok) {
                initPage();
            }
        });
    }

    function clearSavedArticles() {
        $.get("api/clear")
            .then(function () {
                articleContainer.empty();
                initPage();
            });
    }
});

module.exports = router;