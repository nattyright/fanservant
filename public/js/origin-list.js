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