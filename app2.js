$(document).ready(function () {
    $.ajax({
        url: "http://localhost:8000/book/"
    }).done(function(json) {
        $("section").text(json[0].title);
    });
});