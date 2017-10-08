/**
 * Created by chen on 2017/8/20.
 */

t = $("#input").html();
$("#reduce").click(function () {

    t--;
    if (t < 0) {
        t = 1;
    }
    $("#input").html(t);
});
$("#add").click(function () {
    t++;
    $("#input").html(t);
});
$("#many").click(function () {

    $(".page-group #detail .mask").css({"display": "block"});

});
$(".mask").click(function () {
    $(this).css({"display": "none"});
});
$(".text_1").click(function () {
    $.router.load("comment.html");
});