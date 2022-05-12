const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://grail-kun:kalzei77@grail-kun.j25p1.mongodb.net/fan-servants?retryWrites=true&w=majority');
//mongoose.connect(MONGODB_URI);


const servantSchema = {
    _id: String,
    password: String,
    info: Object,
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
  res.setHeader("Access-Control-Allow-Origin", "https://profile.fatechan.top");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
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
    Servants.find({_id: {'$ne':"_empty"}}, {info: 1}, function(err, servants) {
        res.render('index', {
            servantList: servants,
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



router.post('/editprofile', urlencodedParser, async function(req, res) {
    try {
        var result = JSON.parse(req.body.result);
        var mode = req.body.mode;
        var pw = JSON.stringify(await Servants.findOne({_id: result._id}, {password: 1}));
        var id = JSON.stringify(await Servants.findOne({_id: result._id}, {_id: 1}));

        if (result._id == "_empty" || result._id == "" || result._id == null ||

            /^[a-z]+$/.test(result._id) == false) {
            res.end("illegal");

        } else if (result.password != JSON.parse(pw).password) {

            res.end("password");

        } else if (mode == "create" && JSON.parse(id)._id == result._id) {

            res.end("dupid");

        } else {

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



