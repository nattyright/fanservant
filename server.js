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

const Servant = mongoose.model('Servant', servantSchema);


// serve up static CSS & asset files in 'public' folder
app.use(express.static(__dirname + '/public'));

// use router for POST requests
app.use("/",router);
// parse application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// parse application/json
var jsonParser = bodyParser.json()


// render index .ejs file
app.get('/', (req, res) => {

    Servant.find({}, function(err, servants) {

        // servant dictionary for quicker lookup
        var servantDictTemp = {};
        servants.forEach(servant => {
            servantDictTemp[servant.info.cardURL] = servant;
        });

        res.render('index', {
            servantList: servants,
            servantDict: servantDictTemp
        });
    });

})



router.post('/editprofile', urlencodedParser, function(req, res) {
    var user_name = req.body.user;
    console.log(user_name);
    console.log(req.body);
});


app.listen(8080, function() {
    console.log('server is running');
});



