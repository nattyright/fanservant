/*********************************
 *        origin list page       *
 *********************************/

// origin list toggle
  $("#button-close-profile").on("click", function (e) {
    if ($("#origin-list").hasClass("active")) {
        $("#origin-list").removeClass("active");
    } else {
        $("#origin-list").addClass("active");
    }
  });
  $("#button-close-origin-list").on("click", function (e) {
    $("#origin-list").removeClass("active");
  });
  $("#button-servant-icon").on("click", function (e) {
    $("#origin-list").removeClass("active");
  });


  $("#button-hide-unsummoned").on("click", function (e) {
    if ($("#origin-list").hasClass("active")) {
        $(".ol-unsummoned").toggle();
        $("#button-hide-unsummoned").children("span").text($("#button-hide-unsummoned").text().trim() == "Show Summoned" ? "Show All" : "Show Summoned");
        $("#button-hide-unsummoned").children("span").toggleClass("button-smoltext");
        $("#button-hide-unsummoned").children("i").toggleClass("fa-eye");
        $("#button-hide-unsummoned").children("i").toggleClass("fa-eye-slash");
    } else {
        alert("Please go back to Spirit Origin List first!");
    }
});