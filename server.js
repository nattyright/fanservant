const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://grail-kun:kalzei77@grail-kun.j25p1.mongodb.net/fan-servants?retryWrites=true&w=majority');
//mongoose.connect(MONGODB_URI);


const infoSchema = {
    cardURL: String,
    cardartURL: String,
    ccartURL: String,
    oliconURL: String,
    servantName: String,
    servantClass: String,
    servantRarity: String,
    summonedStatus: String,
    time: Date
}


const servantSchema = {
    _id: String,
    password: String,
    info: infoSchema,
    status: Object,
    pskill: Object,
    cskill: Object,
    np: Object,
    cc: Object,
    charinfo: Object,
    fc: Object,
    param: Object,
    profile: Object,
    voice: Object,
    gallery: Object
};

const Servants = mongoose.model('Servants', servantSchema);


// serve up static CSS & asset files in 'public' folder
app.use(express.static(__dirname + '/public'));



app.use((req, res, next) => {
  res.header({
    "Access-Control-Allow-Origin": "https://profile.fatechan.top",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS"
  });
  next();
});



// use router for POST requests
app.use("/",router);
// parse application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// parse application/json
var jsonParser = bodyParser.json()


// render index .ejs file
app.get('/', (req, res) => {

    var names_class = ['Saber',
                       'Archer',
                       'Lancer',
                       'Rider',
                       'Caster',
                       'Assassin',
                       'Berserker',
                       'Avenger',
                       'Ruler',
                       'Alter Ego',
                       'Foreigner',
                       'Moon Cancer',
                       'Shielder'];
    var names_skill = name_npgauge = ['1', '2', '3'];
    var names_skillrank = names_nprank = ['EX', 'A', 'B', 'C', 'D', 'E'];
    var names_skilllv = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    var names_cc = names_rarity = names_nplv = ['1', '2', '3', '4', '5'];
    var names_cardtype = ['Buster', 'Arts', 'Quick'];
    var names_param = ['STR', 'END', 'AGI', 'MAN', 'LUK', 'NP'];
    var names_paramrank = [ {name: 'EX', value: 'O'},
                            {name: 'A+', value: 'A+'},
                            {name: 'B+', value: 'B+'},
                            {name: 'C+', value: 'C+'},
                            {name: 'A', value: 'A'},
                            {name: 'B', value: 'B'},
                            {name: 'D+', value: 'D+'},
                            {name: 'C', value: 'C'},
                            {name: 'D', value: 'D'},
                            {name: 'E+', value: 'E+'},
                            {name: 'E', value: 'E'},
                            {name: '?', value: 'X'}];
    var names_profile = ['1', '2', '3', '4', '5', '6'];

    var html_panel = {
        mid_top: '<img class="panel-img" src="assets/profile-infopanel-top-mid.png">',
        long_top: '<img class="panel-img" src="assets/profile-infopanel-top-long.png">',
        short_top: '<img class="panel-img" src="assets/profile-infopanel-top-short.png">',
        mid_bot: '<img class="panel-img" src="assets/profile-infopanel-bot.png">' 
    }

    Servants.find({_id: {'$ne':"_empty"}}, {info: 1}, {sort: {"info.time": 1}}, function(err, servants) {
        res.render('index', {
            servantList    : servants,
            names_class    : names_class,
            names_rarity   : names_rarity,
            names_skill    : names_skill,
            names_skillrank: names_skillrank,
            names_skilllv  : names_skilllv,
            names_nprank   : names_nprank,
            names_nplv     : names_nplv,
            names_cc       : names_cc,
            names_cardtype : names_cardtype,
            names_profile  : names_profile,
            names_param    : names_param,
            names_paramrank: names_paramrank,
            html_panel     : html_panel
        });
    });
})


// handle get request on loading servant profile
app.get('/loadprofile', async function(req, res) {
    try {
        var result = await Servants.findOne({_id: req._parsedUrl.query});
        res.end(JSON.stringify(result));
    } catch (err) {
        res.end("error");
    }
})




router.post('/deleteprofile', urlencodedParser, async function(req, res) {
    try {
        var id_to_delete = req.body.id;
        var pw_to_delete = req.body.pw;
        var queryResult = await Servants.findOne({_id: id_to_delete}, {password: 1, _id: 1});
        var pw = null;
        
        if (queryResult != null) {
            pw = JSON.parse(JSON.stringify(queryResult)).password;
        }

        if (queryResult == null || id_to_delete == "_empty" ) {
            res.end("illegal");

        } else if (pw_to_delete != pw) {
            // wrong password on EXISTING sheets
            res.end("password");

        } else {
            await Servants.deleteOne({_id: id_to_delete});
            res.end("yes");
            
        }
    } catch (err) {
        res.end("error");
    }
});




router.post('/editprofile', urlencodedParser, async function(req, res) {
    try {
        var result = JSON.parse(req.body.result);
        var mode = req.body.mode;
        var queryResult = await Servants.findOne({_id: result._id}, {password: 1, _id: 1, info: 1});
        var pw = null;
        var id = null;
        var info = null;
        
        if (queryResult != null) {
            pw = JSON.parse(JSON.stringify(queryResult)).password;
            id = JSON.parse(JSON.stringify(queryResult))._id;
            info = JSON.parse(JSON.stringify(queryResult)).info;
        }
        

        if (result._id == "_empty" || result._id == "" || result._id == null ||
            // illegal ID
            /^[a-z]+$/.test(result._id) == false) {
            res.end("illegal");

        } else if (mode == "create" && queryResult != null && id == result._id) {
            // duplicate ID on NEW sheets (existing sheet shares same ID)
            res.end("dupid");

        } else if (queryResult != null && result.password != pw) {
            // wrong password on EXISTING sheets
            res.end("password");

        } else {

            if (result.info.time == 0) {
                result.info.time = info.time;
            }
            await Servants.updateOne({_id: result._id}, result, {upsert: true});
            res.end("yes");
            
        }

        
    } catch (err) {
        res.end("error");
    }
});



app.listen(4321, function() {
    console.log('server is running');
});



