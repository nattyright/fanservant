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



/************************************
 * container scaling with jquery ui *
 ************************************/

var $el = $(".flex-container");
var elHeight = $el.outerHeight();
var elWidth = $el.outerWidth();

var $wrapper = $(".scaleable-wrapper");

$wrapper.resizable({
  resize: doResize,
});

function doResize(event, ui) {
  
  var scale, origin;
  
  if (ui.size.width < 1000) {
      scale = Math.min(
      ui.size.width / elWidth,    
      ui.size.height / elHeight
      );
  }

  
  
  $el.css({
    transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
  });
  
}

var starterData = { 
  size: {
    width: $wrapper.width(),
    height: $wrapper.height(),
  }
}
doResize(null, starterData);













