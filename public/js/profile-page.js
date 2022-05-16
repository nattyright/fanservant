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
  

function loadServantProfile_status(a) {
  document.getElementById('pf-status-ascension-count').src = "assets/status/ascension_4.png";
}


function loadServantProfile(a) {

  // load card art
  document.getElementById('pf-charagraph-base').src = "assets/charagraph/base_servant.png";

  document.getElementById('pf-cardURL').src = a.info.cardartURL;
  //document.getElementById('pf-cardURL').src = "assets/cardart/" + a.info.cardURL + ".png";
  document.getElementById('pf-charagraph-frame').src = "assets/charagraph/charagraph_servant_0" + a.info.servantRarity.toString() + ".png";
  document.getElementById('pf-charagraph-class').src = "assets/charagraph/class" + a.info.servantClass.replace(/\s/g, '').toLowerCase() + a.info.servantRarity.toString() + "_charagraph" + ".png";
  document.getElementById('pf-info-servantClass').innerHTML = a.info.servantClass;
  document.getElementById('pf-info-servantName').innerHTML = a.info.servantName;

  // load servant status (optional)
  if ('status' in a) {
    if (a.status.atk != "") {
      document.getElementById('pf-status-atk').innerHTML = a.status.atk;
    }
    if (a.status.hp != "") {
      document.getElementById('pf-status-hp').innerHTML = a.status.hp;
    }
  }

  loadServantProfile_status(a);
  
  // load charagraph arrows
  document.getElementById('pf-charagraph-arrow').src = "assets/charagraph/left_arrow.png";
  



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
            document.getElementById('pf-cskill-' + skill + '-' + key).innerHTML = a.cskill[skill][key];
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
  // get text next to NP gauge
  let npgauagetext = "MAX 100%";
  if (["2", "3", "4"].includes(a.np.level)) {
    npgauagetext = "MAX 200%";
  } else if (a.np.level == "5") {
    npgauagetext = "MAX 300%";
  }
  document.getElementById('pf-np-gaugetext').innerHTML = npgauagetext;
  
  document.getElementById('pf-np-gauge-1').src = "assets/np-gauge-1.png";
  document.getElementById('pf-np-gauge-2').src = "assets/np-gauge-0.png";
  document.getElementById('pf-np-gauge-3').src = "assets/np-gauge-0.png";
  if (a.np.level > 1) {
    document.getElementById('pf-np-gauge-2').src = "assets/np-gauge-2.png";
  }
  if (a.np.level == 5) {
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
    document.getElementById('pf-param-' + key).style.color = "white";
    document.getElementById('pf-param-' + key).innerHTML = a.param[key];
    if (a.param[key] == "X") {
        document.getElementById('pf-param-' + key).innerHTML = "?";
    } else if (a.param[key] == "O") {
        document.getElementById('pf-param-' + key).innerHTML = "EX";
        document.getElementById('pf-param-' + key).style.color = "gold";
    }
    if (a.param[key] != null) {
      document.getElementById('pf-param-' + key + '-img').src = "assets/param-" + a.param[key].slice(0,1) + '.png';
    }
    
  }

  // load profiles
  for (let key in a.profile) {
    if (a.profile[key].startsWith("[LOCK]")) {
      // locked profiles
      let unlockCondition = a.profile[key].split("]")[1].replace("[", "");
      document.getElementById('pf-profile-' + key).innerHTML = unlockCondition;
      document.getElementById('pf-profile-' + key).style.color = "gold";
      document.getElementById('pf-profile-' + key).style.borderColor = "#555555";
      document.getElementById('pf-profile-' + key).previousElementSibling
                                                    .previousElementSibling
                                                    .previousElementSibling.src = 'assets/profile-infopanel-top-mid-locked.png';
      document.getElementById('pf-profile-' + key).nextElementSibling.src = 'assets/profile-infopanel-bot-locked.png';

    } else {
      // unlocked profiles
      document.getElementById('pf-profile-' + key).innerHTML = a.profile[key];  
      document.getElementById('pf-profile-' + key).removeAttribute('style');
      if (key.startsWith("profile")) {
        document.getElementById('pf-profile-' + key).previousElementSibling
                                                    .previousElementSibling
                                                    .previousElementSibling.src = '';
        document.getElementById('pf-profile-' + key).nextElementSibling.src = 'assets/profile-infopanel-bot.png';
      }
          
    }
  }

  // turn character sheet URL into a hyperlink instead of the full URL
  let sheetLink = document.createElement("a");
  sheetLink.setAttribute('href', a.profile.sheet);
  sheetLink.setAttribute('target', '_blank');
  sheetLink.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i>';
  document.getElementById('pf-profile-sheet').innerHTML = '';
  document.getElementById('pf-profile-sheet').appendChild(sheetLink);


  // load voiceovers
  var voiceHTML = '<div class="voice-tip">Tap an entry to play a voice.</div>';
  var count = 0;
  for (let key in a.voice) {
    var voicetemp = '<div class="voice-img" data-slide="1' + count.toString() + '">' + 
                    '<img class="panel-img" src="assets/profile-voicepanel-top.png">' + 
                    '<div class="voice-title">My Room</div>' + 
                    '<div class="panel-text voice-panel" id="pf-voice-' + key + '">' + a.voice[key].name + '</div>' + 
                    '<img class="panel-img panel-img-voice-bot" src="assets/profile-voicepanel-bot.png"></div>' + 
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
  if ('gallery' in a && 'image1' in a.gallery) {
    changeGalleryImage(a.gallery.image1.url);
  }



}
