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
  let status_maxlv = [60, 65, 70, 80, 90];
  let status_cost =  [ 3,  4,  7, 12, 16];

  document.getElementById('pf-status-portraitURL').src = a.status.portraitURL;
  document.getElementById('pf-status-ascension-count').src = "assets/status/ascension_4.png";
  document.getElementById('pf-status-lv-content').innerHTML = status_maxlv[parseInt(a.info.servantRarity) - 1];
  document.getElementById('pf-status-lv-tail').innerHTML = status_maxlv[parseInt(a.info.servantRarity) - 1];


  document.getElementById('pf-status-fou-atk').innerHTML = a.status.fou.atk;
  document.getElementById('pf-status-fou-hp').innerHTML = a.status.fou.hp;

  let temp_num_hp = parseInt(a.status.atk) + parseInt(document.getElementById('pf-status-fou-atk').innerHTML);
  document.getElementById('pf-status-atk-content').innerHTML = temp_num_hp.toLocaleString();

  let temp_num_atk = parseInt(a.status.hp) + parseInt(document.getElementById('pf-status-fou-hp').innerHTML);
  document.getElementById('pf-status-hp-content').innerHTML = temp_num_atk.toLocaleString();

  // change card hp/atk color if fou
  if (parseInt(document.getElementById('pf-status-fou-hp').innerHTML) > 0) {
    document.getElementById('pf-status-hp-content').style.color = 'var(--profileyellow)';
    $('#pf-status-hp').addClass('gold');
  } else {
    document.getElementById('pf-status-hp-content').style.color = 'white';
    $('#pf-status-hp').removeClass('gold');
  }
  if (parseInt(document.getElementById('pf-status-fou-atk').innerHTML) > 0) {
    document.getElementById('pf-status-atk-content').style.color = 'var(--profileyellow)';
    $('#pf-status-atk').addClass('gold');
    
  } else {
    document.getElementById('pf-status-atk-content').style.color = 'white';
    $('#pf-status-atk').removeClass('gold');
  }

  document.getElementById('pf-status-cost-content').innerHTML = status_cost[parseInt(a.info.servantRarity) - 1];

  let bond_lv = a.status.bond;
  document.getElementById('pf-status-bondlv-content').innerHTML = Math.floor(bond_lv);
  if (bond_lv <= 5) {
    document.getElementById('pf-status-bondlv-count1').value = bond_lv * 20;
    document.getElementById('pf-status-bondlv-count2').value = 0;
  } else {
    document.getElementById('pf-status-bondlv-count1').value = 5 * 20;
    document.getElementById('pf-status-bondlv-count2').value = (bond_lv - 5) * 20;
  }

  let bond_exp_next = a.status.bondnext;
  if (bond_exp_next != null) {
    document.getElementById('pf-status-bondnext-content').innerHTML = bond_exp_next.replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
  } else {
    document.getElementById('pf-status-bondnext-content').innerHTML = "6969".replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
  }
  
  
  
  
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


  loadServantProfile_status(a);

  // load servant status (optional)
  if ('status' in a) {
    if (a.status.atk != "") {
      document.getElementById('pf-status-atk').innerHTML = document.getElementById('pf-status-atk-content').innerHTML.replace(",", "");
    }
    if (a.status.hp != "") {
      document.getElementById('pf-status-hp').innerHTML = document.getElementById('pf-status-hp-content').innerHTML.replace(",", "");
    }
  }

  
  
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
        document.getElementById('pf-param-' + key).style.color = "var(--profileyellow)";
    }
    if (a.param[key] != null) {
      document.getElementById('pf-param-' + key + '-img').src = "assets/param-" + a.param[key].slice(0,1) + '.png';
    }
    
  }

  // load profiles
  for (let key in a.profile) {
    if (a.profile[key].startsWith("[LOCKED]")) {
      // locked profiles
      let unlockCondition = a.profile[key].split("]")[1].replace("[", "");
      document.getElementById('pf-profile-' + key).innerHTML = unlockCondition;
      document.getElementById('pf-profile-' + key).classList.add("locked");
      $('#pf-profile-' + key).parent().find(".panel-bg-top").addClass("locked");
      $('#pf-profile-' + key).parent().find(".panel-bg-top-wrapper").addClass("locked");
      $('#pf-profile-' + key).parent().find(".panel-bg-wrapper").addClass("locked");

    } else {
      // unlocked profiles
      document.getElementById('pf-profile-' + key).innerHTML = a.profile[key];  
      document.getElementById('pf-profile-' + key).classList.remove("locked");
            $('#pf-profile-' + key).parent().find(".panel-bg-top").removeClass("locked");
      $('#pf-profile-' + key).parent().find(".panel-bg-top-wrapper").removeClass("locked");
      $('#pf-profile-' + key).parent().find(".panel-bg-wrapper").removeClass("locked");       
    
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
    var voicetemp = '<div class="panel-wrapper"><div class="panel-bg-wrapper"><div class="panel-bg-top-wrapper"><div class="panel-bg-top short"></div></div><div class="panel-bg"></div></div>' + 
                    '<div class="voice-img" data-slide="1' + count.toString() + '">' + 
                    '<div class="voice-title">My Room</div>' + 
                    '<div class="panel-text voice-panel" id="pf-voice-' + key + '"><img class="voice-icon" src="assets/profile-voicepanel-icon.png">' + a.voice[key].name + '</div>' + 
                    '</div></div>' + 
                    '<div class="voice-text" data-slide="1' + count.toString() + '">' + '<p>' + a.voice[key].desc.replace(/(?:\r\n|\r|\n)/g, "</p><p>") + '</p>' + '</div>';
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


  // fit text in relevant elements to 1 row
  fitty('#pf-np-name', {
    minSize: 15,
    maxSize: 23,
    multiLine: true,
  });
  fitty('.pskill-name', {
    minSize: 15,
    maxSize: 22,
    multiLine: true,
  });
  fitty('.cskill-name', {
    minSize: 15,
    maxSize: 22,
    multiLine: true,
  });

}
