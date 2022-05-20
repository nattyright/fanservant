/*********************************
 *         disqus  toggle        *
 *********************************/

$("#disqus_thread_toggle").on("click", function (e) {
    $("#disqus_thread").toggle();
    $("#instructions").hide();
    $("#disqus_thread_toggle").toggleClass("active");
    $("#instructions_toggle").removeClass("active");
});

$("#instructions_toggle").on("click", function (e) {
    $("#instructions").toggle();
     $("#disqus_thread").hide();
     $("#instructions_toggle").toggleClass("active");
     $("#disqus_thread_toggle").removeClass("active");
});















