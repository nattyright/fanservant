/**********************************
 *           page toggle          *
 **********************************/


// edit page CANCEL (clear edit page & remove active status)
$("#edit-page-cancel").on("click", function (e) {
    $("#edit-page").removeClass("active");

    // clear input fields
    $(":input").each(function (index, element) {
        if ($(this).attr("id") != "submit" && 
            $(this).attr("id") != "delete" && 
            $(this).attr("id") != "edit-page-cancel" &&
            $(this).attr("id") != "edit-page-unlock") {
            $(this).val("");
        }
    });
    // remove voiceover and gallery entirely since they're auto generated
    $("#edit-voice").html("");
    $("#edit-gallery").html("");
});

// edit existing profile (remove "create" status)
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

// '''edit''' nonexistent profile aka create new profile
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


/**********************************
 *            nav menu            *
 **********************************/
function initEditMenu() {
    $("#edit-page").addClass("active");
    $("#edit-nav").removeClass("active");
    $(".edit-page-wrapper").hide();
    $("#edit-wrapper-unlock").show();
    $("#edit-nav-unlock").addClass("active");
}

$(".edit-nav").on("click", function(e) {
    $(".edit-page-wrapper").hide();
    $(".edit-nav").removeClass("active");
    $(this).addClass("active");
    $(this).next().toggle();
});





// add new voice line
$("#edit-voice-add").on("click", function (e) {
    var newDiv = document.createElement("div");
    let count = parseInt($("#edit-voice")
            .children(":nth-last-child(2)")
            .find("input")
            .attr("id")
            .split("-")[2]
            .replace("voice", "")) + 1;
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
            .replace("image", "")) + 1;
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
function populateEditPage(servantURL) {

    // clear input fields
    $(":input").each(function (index, element) {
        if ($(this).attr("id") != "submit" && 
            $(this).attr("id") != "delete" && 
            $(this).attr("id") != "edit-page-cancel" &&
            $(this).attr("id") != "edit-page-unlock") {
            $(this).val("");
        }
    });
    // remove voiceover and gallery entirely since they're auto generated
    $("#edit-voice").html("");
    $("#edit-gallery").html("");

    // popular servant ID field ONLY since profile is locked
    $("#edit-info-cardURL").val(servantURL);

    // hide submit page or you're in for a very fun ride : )))
    $('.edit-page-wrapper-lock').hide();

}



async function populateEditPageUNLOCK(servantURL) {

    // if creating new page, don't read anything
    if (servantURL == "new") {
        $('.edit-page-wrapper-lock').show();
        return;
    }


    let a = {};

    await $.get("/loadprofile", servantURL, function(data, status) {
        if(status === 'success') {
            a = JSON.parse(data);
        } else {
            alert("Error loading profile! Try again later.");
        }
    });

    if (a.password != $("#edit-password").val()) {
        alert("Invalid password!");
        return;
    }


    $(":input").each(function (index, element) {
        if ($(this).attr("id") != "submit" && 
            $(this).attr("id") != "delete" && 
            $(this).attr("id") != "edit-page-cancel" && 
            $(this).attr("id") != "edit-page-unlock" &&
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

    $('.edit-page-wrapper-lock').show();
}



// edit page delete POST request
$(document).ready(function() {

    $("#delete").click(function(){
        let id = $("#edit-info-cardURL").val();
        let pw = $("#edit-password").val();

        $.post("/deleteprofile", {id: id, pw: pw}, function(data){
            if(data === 'yes') {
                alert("Profile deleted.");
            } else if (data === 'error') {
                alert("Deletion failed! Try again.");
            } else if (data === 'illegal') {
                alert("Invalid Servant ID!");
            } else if (data === 'password') {
                alert("Invalid Password!");
            } 
        });
    });
});



// edit page unlock page POST request
$(document).ready(function() {

    $("#edit-page-unlock").click(function(){
        let id = $("#edit-info-cardURL").val();
        let pw = $("#edit-password").val();

        $.post("/unlockprofile", {id: id, pw: pw}, function(data){
            if (data === 'error') {
                alert("Unlock failed! Try again.");
            } else if (data === 'password') {
                alert("Invalid Password!");
            } else {
                populateEditPageUNLOCK(id);
            }
        });
    });
});



// edit page submit POST request
$(document).ready(function() {
    var user,pass;
    $("#submit").click(function(){

        let keys = [];
        let unfilled_fields_count = 0;

        $(":input").each(function() {
            if ($(this).attr("id") != "submit" && 
                $(this).attr("id") != "delete" &&
                $(this).attr("id") != "edit-page-cancel" &&
                $(this).attr("id") != "edit-page-unlock") {
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

                // count unfilled fields to determine whether servant is summoned
                if (item[1] == "") {
                    unfilled_fields_count += 1;
                }

                return root;
            }, Object.create(null));

        let result = buildMenuMap(keys);
        // add id
        result["_id"] = result.info.cardURL;


        // check whether we're editing an existing sheet or creating a new sheet
        let mode = "edit";
        if ($("#edit-page").hasClass("create")) {
            mode = "create";
            $("edit-page").removeClass("create");
            result.info["time"] = Date.now();
        } else {
            result.info["time"] = 0;
        }


        // checked whether we have too many unfilled fields 
        // if too many (> 10), servant is unsummoned
        if (unfilled_fields_count > 10) {
            result.info["summonedStatus"] = "unsummoned";
        } else {
            result.info["summonedStatus"] = "summoned";
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