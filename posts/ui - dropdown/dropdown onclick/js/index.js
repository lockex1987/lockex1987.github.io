

$(".dropdown-toggle").click(function () {
    $(".button-dropdown .dropdown-menu").hide();
    $(".button-dropdown .dropdown-toggle").removeClass("active");
    
    var t = $(this).parents(".button-dropdown").children(".dropdown-menu").is(":hidden");
    if (t) {
        $(this)
            .parents(".button-dropdown").children(".dropdown-menu").toggle()
            .parents(".button-dropdown").children(".dropdown-toggle").addClass("active");
    }
});

$(document).bind("click", function (t) {
    var n = $(t.target);
    if (!n.parents().hasClass("button-dropdown")) {
        $(".button-dropdown .dropdown-menu").hide();
        $(".button-dropdown .dropdown-toggle").removeClass("active");
    }
});
