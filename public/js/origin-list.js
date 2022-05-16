/**********************************
 *   origin list servant icons    *
 **********************************/

// load servant profile from origin list
$(".ol-icon").on("click", async function (e) {
    let servantURL = $(this).find(".ol-icon-servant").attr("id").substring(3);

    await $.get("/loadprofile", servantURL, function(data, status) {
        if(status === 'success') {
            loadServantProfile(JSON.parse(data));
        } else {
            alert("Error loading profile! Try again later.");
        }
    });

    $("#origin-list").removeClass("active");
    
  });


/*********************************
 *          sidebar menu         *
 *********************************/

// close button toggles between origin list & profile
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



// edit button - edit existing profile (remove "create" status)
$("#button-edit-page").on("click", function (e) {
    if ($("#origin-list").hasClass("active")) {
        alert("Please go to a Servant profile page first!");
    } else {
        populateEditPage($("#pf-servantID").html());
        $("#edit-info-cardURL").attr("readonly", true);
        $("#edit-password-label").text("To unlock all fields, input the password you created for this profile.");
        $("#edit-page").removeClass("create");
        $("#edit-page-unlock").show();
        initEditMenu();
    }
});


// create button - '''edit''' nonexistent profile aka create new profile
$("#button-create-page").on("click", function (e) {
    if ($("#origin-list").hasClass("active")) {
        populateEditPageUNLOCK('new');
        $("#edit-info-cardURL").attr("readonly", false);
        $("#edit-page").addClass("create");
        $("#edit-page-unlock").hide();
        initEditMenu();
    } else {
        alert("Please go back to Spirit Origin List first!");
    }
});


// hide/show unsummon button
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




