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




/**********************************
 *          profile page          *
 **********************************/

// profile tabs
  $(".profile-nav").on("click", function (e) {
    e.preventDefault();
    // get current slide
    var current = $(".profile-nav.active").data("slide"),
      // get button data-slide
      next = $(this).data("slide");

    $(".profile-nav").removeClass("active");
    $(this).addClass("active");

    $(".profile-nav").css('background-image','url(../assets/button-profile-nav.png)');
    $(".profile-nav.active").css('background-image','url(../assets/button-profile-nav-red.png)');

    if (current === next) {
      return false;
    } else {
      $("#profile-content")
        .find(".profile-content[data-slide=" + next + "]")
        .addClass("active");

      $("#profile-content")
        .find(".profile-content[data-slide=" + current + "]")
        .removeClass("active");
    }
  });

// voiceovers 
function bindVoiceoverPanels() {
    $(".voice-img").on("click", function (e) {
    e.preventDefault();
    // get current slide
    var current = $(this).data("slide");
    $(this).addClass("active");


    $("#profile-content-voiceover")
      .find(".voice-text[data-slide=" + current + "]")
      .addClass("active");
  });

  $(".voice-text").on("click", function (e) {
    e.preventDefault();
    // get current slide
    var current = $(this).data("slide");
    $(this).removeClass("active");

    $("#profile-content-voiceover")
      .find(".voice-img[data-slide=" + current + "]")
      .removeClass("active");
  });
}

function changeGalleryImage(newSrc) {
    document.getElementById("pf-gallery-img").src = newSrc;
}
  

// load servant profile from origin list
$(".ol-icon").on("click", async function (e) {
    let servantURL = $(this).find(".ol-icon-servant").attr("id").split("-")[1];

    await $.get("/loadprofile", servantURL, function(data, status) {
        if(status === 'success') {
            loadServantProfile(JSON.parse(data));
        } else {
            alert("Error loading profile! Try again later.");
        }
    });

    $("#origin-list").removeClass("active");
    
  });



function loadServantProfile(a) {

  // load card art
  document.getElementById('pf-charagraph-base').src = "assets/charagraph/base_servant.png";

  document.getElementById('pf-cardURL').src = a.info.cardartURL;
  //document.getElementById('pf-cardURL').src = "assets/cardart/" + a.info.cardURL + ".png";
  document.getElementById('pf-charagraph-frame').src = "assets/charagraph/charagraph_servant_0" + a.info.servantRarity.toString() + ".png";
  document.getElementById('pf-charagraph-class').src = "assets/charagraph/class" + a.info.servantClass.toLowerCase() + a.info.servantRarity.toString() + "_charagraph" + ".png";

  

  // load servant name, servant class, servant id
  document.getElementById('pf-servantName').innerHTML = a.info.servantName;
  document.getElementById('pf-servantClass').innerHTML = a.info.servantClass;
  document.getElementById('pf-servantID').innerHTML = a._id;



  // load personal skills
  for (let skill in a.pskill) {
    for (let key in a.pskill[skill]) {
        if (key != "iconURL") {
            document.getElementById('pf-pskill-' + skill + '-' + key).innerHTML = a.pskill[skill][key];
        } else {
            document.getElementById('pf-pskill-' + skill + '-' + key).src = a.pskill[skill][key];
        }
        
    }
  }

  // load class skills
  for (let skill in a.cskill) {
    for (let key in a.cskill[skill]) {
        if (key != "iconURL") {
            document.getElementById('pf-cskill-' + skill + '-' + key).innerHTML = a.pskill[skill][key];
        } else {
            document.getElementById('pf-cskill-' + skill + '-' + key).src = a.cskill[skill][key];
        }
        
    }
  }

  // load noble phantasm
  document.getElementById('pf-np-bot').src = "assets/card-np-" + a.np.type + ".png";
  document.getElementById('pf-np-servant').src = a.info.ccartURL;
  document.getElementById('pf-np-mid').src = "assets/card-" + a.np.type + "-mid.png";
  document.getElementById('pf-np-top').src = "assets/card-" + a.np.type + "-top.png";
  for (let key in a.np) {
    if (key != "type" && key != "gauge" && key != "level") { document.getElementById('pf-np-' + key).innerHTML = a.np[key]; }
    if (key == "level") { document.getElementById('pf-np-' + key).innerHTML = a.np[key] + "/5"; }
  } 
  document.getElementById('pf-np-gauge-1').src = "assets/np-gauge-1.png";
  document.getElementById('pf-np-gauge-2').src = "assets/np-gauge-0.png";
  document.getElementById('pf-np-gauge-3').src = "assets/np-gauge-0.png";
  if (a.np.gauge > 1) {
    document.getElementById('pf-np-gauge-2').src = "assets/np-gauge-2.png";
  }
  if (a.np.gauge == 5) {
    document.getElementById('pf-np-gauge-3').src = "assets/np-gauge-3.png";
  }

  // load command cards
  for (let key in a.cc) {
    document.getElementById('pf-cc-' + key + '-bot').src = "assets/card-" + a.cc[key] + "-bot.png";
    document.getElementById('pf-cc-' + key + '-servant').src = a.info.ccartURL;
    document.getElementById('pf-cc-' + key + '-mid').src = "assets/card-" + a.cc[key] + "-mid.png";
    document.getElementById('pf-cc-' + key + '-top').src = "assets/card-" + a.cc[key] + "-top.png";
  }

  // load params
  for (let key in a.param) {
    document.getElementById('pf-param-' + key).innerHTML = a.param[key];
    document.getElementById('pf-param-' + key + '-img').src = "assets/param-" + a.param[key] + '.png';
  }

  // load profiles
  for (let key in a.profile) {
    document.getElementById('pf-profile-' + key).innerHTML = a.profile[key];
  }

  // load voiceovers
  var voiceHTML = "";
  var count = 0;
  for (let key in a.voice) {
    var voicetemp = '<div class="voice-img" data-slide="1' + count.toString() + '">' + 
                    '<img class="panel-img" src="assets/profile-voicepanel-top.png">' + 
                    '<div class="voice-title">My Room</div>' + 
                    '<div class="panel-text voice-panel" id="pf-voice-' + key + '">' + a.voice[key].name + '</div>' + 
                    '<img class="panel-img" src="assets/profile-voicepanel-bot.png"></div>' + 
                    '<div class="voice-text" data-slide="1' + count.toString() + '">' + a.voice[key].desc + '</div>';
    count++;


    voiceHTML += voicetemp;
  }
  document.getElementById('profile-content-voiceover').innerHTML = voiceHTML;
  bindVoiceoverPanels();


  // load gallery
  var galleryHTML = "<ul>";
  for (let key in a.gallery) {
    var gallerytemp =   '<li><a class="gallery-link" href="javascript:" onclick="changeGalleryImage(' + "'" + a.gallery[key].url + "'" + ');">' + a.gallery[key].name + '</a></li>';
    galleryHTML += gallerytemp;
  }
  galleryHTML += "</ul>";
  document.getElementById('pf-gallery-nav').innerHTML = galleryHTML;
  changeGalleryImage(a.gallery.image1.url)



}








/**********************************
 *            edit page           *
 **********************************/


// edit page toggle
$("#edit-page-cancel").on("click", function (e) {
    $("#edit-page").removeClass("active");

    // clear input fields
    $(":input").each(function (index, element) {
        if ($(this).attr("id") != "submit" && 
            $(this).attr("id") != "edit-page-cancel") {
            $(this).val("");
        }
    });
    // remove voiceover and gallery entirely since they're auto generated
    $("#edit-voice").html("");
    $("#edit-gallery").html("");
});
// edit existing profile
$("#button-edit-page").on("click", function (e) {
    if ($("#origin-list").hasClass("active")) {
        alert("Please go to a Servant profile page first!");
    } else {
        populateEditPage($("#pf-servantID").html());
        $("#edit-info-cardURL").attr("readonly", true);
        $("#edit-password-label").text("To submit your edit, input the password you created for this page.");
        $("#edit-page").addClass("active");
    }
});
// '''edit''' nonexistent profile aka create new profile
$("#button-create-page").on("click", function (e) {
    if ($("#origin-list").hasClass("active")) {
        populateEditPage('_empty');
        $("#edit-info-cardURL").attr("readonly", false);
        $("#edit-page").addClass("active");
        $("#edit-page").addClass("create");
    } else {
        alert("Please go back to Spirit Origin List first!");
    }
});


// add new voice line
$("#edit-voice-add").on("click", function (e) {
    var newDiv = document.createElement("div");
    let count = parseInt($("#edit-voice")
            .children(":nth-last-child(2)")
            .find("input")
            .attr("id")
            .split("-")[2]
            .slice(-1)) + 1;
    let tempHTML =  '<label for="edit-voice-voice' + count.toString() + '-name">Voice ' + count.toString() + ' Title</label><br>' +
                    '<input type="text" id="edit-voice-voice' + count.toString() + '-name" name="edit-voice-voice' + count.toString() + '-name" value=""><br>' + 
                    '<label for="edit-voice-voice' + count.toString() + '-desc">Voice ' + count.toString() + ' Dialogue</label><br>' +
                    '<textarea id="edit-voice-voice' + count.toString() + '-desc" name="edit-voice-voice' + count.toString() + '-desc" rows="5" cols="30"></textarea>';
    newDiv.innerHTML = tempHTML;
    document.getElementById("edit-voice").appendChild(newDiv);
    var newDiv2 = document.createElement("div");
    newDiv2.className = 'flex-break';
    document.getElementById("edit-voice").appendChild(newDiv2);
});



// add new gallery image
$("#edit-gallery-add").on("click", function (e) {
    var newDiv = document.createElement("div");
    let count = parseInt($("#edit-gallery")
            .children(":nth-last-child(2)")
            .find("input")
            .attr("id")
            .split("-")[2]
            .slice(-1)) + 1;
    let tempHTML =  '<label for="edit-gallery-image' + count.toString() + '-name">Image ' + count.toString() + ' Title</label><br>' + 
                    '<input type="text" id="edit-gallery-image' + count.toString() + '-name" name="edit-gallery-image' + count.toString() + '-name" value=""><br>' +
                    '<label for="edit-gallery-image' + count.toString() + '-url">Image ' + count.toString() + ' URL</label><br>' + 
                    '<input type="text" id="edit-gallery-image' + count.toString() + '-url" name="edit-gallery-image' + count.toString() + '-url" value=""><br>';
    newDiv.innerHTML = tempHTML;
    document.getElementById("edit-gallery").appendChild(newDiv);
    var newDiv2 = document.createElement("div");
    newDiv2.className = 'flex-break';
    document.getElementById("edit-gallery").appendChild(newDiv2);
});




// edit page populate with current servant profile
async function populateEditPage(servantURL) {

    let a = {};

    await $.get("/loadprofile", servantURL, function(data, status) {
        if(status === 'success') {
            a = JSON.parse(data);
        } else {
            alert("Error loading profile! Try again later.");
        }
    });


    $(":input").each(function (index, element) {
        if ($(this).attr("id") != "submit" && 
            $(this).attr("id") != "edit-page-cancel" && 
            $(this).attr("id") != "edit-password") {
            let keys = $(this).attr("id").split("-");
            let item = a;
            for (let i = 1; i < keys.length; i++) {
                item = item[keys[i]];
            }
            $(this).val(item);
        }
    });

    // voiceovers
    let tempHTML = "";
    let count = 1;
    for (let key in a.voice) {

        let temp =  '<div><label for="edit-voice-voice' + count.toString() + '-name">Voice ' + count.toString() + ' Title</label><br>' +
                    '<input type="text" id="edit-voice-voice' + count.toString() + '-name" name="edit-voice-voice' + count.toString() + '-name" value="' + a.voice[key].name + '"><br>' + 
                    '<label for="edit-voice-voice' + count.toString() + '-desc">Voice ' + count.toString() + ' Dialogue</label><br>' +
                    '<textarea id="edit-voice-voice' + count.toString() + '-desc" name="edit-voice-voice' + count.toString() + '-desc" rows="5" cols="30">' + a.voice[key].desc + '</textarea></div>' +
                    '<div class="flex-break"></div>';
        tempHTML += temp;
        count += 1;
    }
    document.getElementById("edit-voice").innerHTML = tempHTML;

    // gallery
    tempHTML = "";
    count = 1;
    for (let key in a.gallery) {

        let temp = '<div><label for="edit-gallery-image' + count.toString() + '-name">Image ' + count.toString() + ' Title</label><br>' + 
                    '<input type="text" id="edit-gallery-image' + count.toString() + '-name" name="edit-gallery-image' + count.toString() + '-name" value="' + a.gallery[key].name + '"><br>' +
                    '<label for="edit-gallery-image' + count.toString() + '-url">Image ' + count.toString() + ' URL</label><br>' + 
                    '<input type="text" id="edit-gallery-image' + count.toString() + '-url" name="edit-gallery-image' + count.toString() + '-url" value="' + a.gallery[key].url + '"><br></div>' +
                    '<div class="flex-break"></div>';
        tempHTML += temp;
        count += 1;
    }
    document.getElementById("edit-gallery").innerHTML = tempHTML;

}



// edit page submit POST request
$(document).ready(function() {
    var user,pass;
    $("#submit").click(function(){

        let keys = [];

        $(":input").each(function() {
            if ($(this).attr("id") != "submit" && 
                $(this).attr("id") != "edit-page-cancel") {
                // [id, val]
                keys.push([$(this).attr("id").replace("edit-", ""), $(this).val()]);
            }
        });

        const buildMenuMap = menu =>
            menu.reduce((root, item) => {
                let parts = item[0].split("-"); //item[0] holds the id
                let lastPart = parts.pop();
                let leaf = parts.reduce((acc, part) => acc[part] || (acc[part] = {}), root);
                leaf[lastPart] = item[1]; //item[1] holds the val()
                return root;
            }, Object.create(null));

        let result = buildMenuMap(keys);
        // add id
        result["_id"] = result.info.cardURL;
        //console.log(result);


        // check whether we're editing an existing sheet or creating a new sheet
        let mode = "edit";
        if ($("#edit-page").hasClass("create")) {
            mode = "create";
            $("edit-page").removeClass("create");
            result.info["time"] = Date.now();
        } else {
            result.info["time"] = 0;
        }
        

        $.post("/editprofile",{result: JSON.stringify(result), mode: mode}, function(data){
            if(data === 'yes') {
                alert("Profile updated.");
            } else if (data === 'error') {
                alert("Update failed! Try again.");
            } else if (data === 'illegal') {
                alert("Invalid Servant ID!");
            } else if (data === 'password') {
                alert("Invalid Password!");
            } else if (data === 'dupid') {
                alert("Servant ID already in use!");
            }
        });
    });
});