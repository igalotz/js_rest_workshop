$(document).ready(function () {

    function main() {
        $.ajax({
            url: "http://localhost:8000/book/"
        }).done(
            function (json) {
                var $section = $("#books-list").detach();
                for (var i = 0; i < json.length; i++) {
                    var $book = $("<p>", { "data-id": json[i].id, class: "book-title" });
                    $book.html("<strong>" + json[i].title + "</strong> <a href='#' class='delete'>usuń</a>");
                    $section.append($book);
                    $section.append($("<div class='book-details'>"));
                }
                $("h1#title").after($section);
            }
            );

    }

    main();

    $("body").on("click", ".book-title", function (event) {
        var self = this;
        $.ajax({
            url: "http://localhost:8000/book/" + $(this).data("id") + "/"
        }).done(function (json) {

            $div = $(self).next();
            $div.append($("<h3>").text(json.title));
            $div.append($("<p>").text(json.author));
            $div.append($("<p>").text(json.isbn));
            $div.append($("<p>").text(json.publisher));
            $div.show();
        });
    });

    $("body").on("click", ".delete", function (event) {
        var id = $(this).parent().data("id");
        event.stopPropagation();
        $.ajax({
            url: "http://localhost:8000/book/" + id + "/",
            type: "delete"
        }).always(
            function () {
                
                $("#books-list").empty();
                main();
            }
            )
    });

});