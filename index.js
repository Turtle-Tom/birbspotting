var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var Birb = require('./models/Birb');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var dataUtil = require("./data-util");
var _ = require('underscore');

// Load envirorment variables
dotenv.load();

console.log(process.env.MONGODB);

// Connect to Sandbox MongoDB
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error',function(err){
    console.log("Connection was unable to take place");
    process.exit(1);
});

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

// For loading in sample data

 // for (i in dataUtil.loadData().objects) {
 //     birb = new Birb(dataUtil.loadData().objects[i]);
 //
 //     birb.save(function(err){
 //        if (err) throw err;
 //        console.log("Successfully inserted birb :)");
 //    });
 // }

/*
 * Generates random integer between bounds inclusive
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

// $("#state_field").keyup(function () {
//     var str = inStates($("#state_field").val());
//     var show = [];
//
//     Birb.find({}, function(err, _DATA){
//        if (err) throw err;
//
//        for (i in _DATA) {
//            for (j in _DATA[i]) {
//                if (_DATA[i][j].indexOf(str)) {
//                    show.push(_DATA[i]);
//                    break;
//                }
//            }
//        }
//
//        res.render('allbirbs', {birb: _DATA});
//     });
// });

 app.get('/', function(req, res) {
     Birb.find({}, function(err, _DATA){
        if (err) throw err;
        res.render('allbirbs', {birb: _DATA});
    });
 });

 app.get('/add', function(req, res) {
     res.render('addbirb', {});
 });

 app.post('/add/:birb', function(req, res) {
     var birb = new Birb({
         name: req.body.name,
         state: req.body.state,
         color: req.body.color,
         season: req.body.season.toLowerCase(),
         spotter: req.body.spotter,
         size: req.body.size.toString(),
         characteristics: req.body.characteristics.split(' ')
     });

     birb.save(function(err) {
         if (err) throw err;
         return res.redirect('/');
     })
 });

 app.get('/winter', function(req, res) {
     var winter = {};

     Birb.find({}, function(err, _DATA){
        if (err) throw err;
         for (i in _DATA) {
             var birb = _DATA[i]

             if (birb.season.toLowerCase() == "winter") {
                 if (!winter.hasOwnProperty(birb.name)) {
                     winter[birb.name] = birb;
                     winter[birb.name].spottings = 1;
                     winter[birb.name].characteristics = birb.characteristics;
                     console.log(winter[birb.name].characteristics);
                 } else {
                     winter[birb.name].spottings += 1;
                 }
             }
         }

         res.render('winterbirbs', {winter_birb: winter});
     });
 });

 app.get('/popular', function(req, res) {
     var popular = {};
     var max = 0;
     var popBirb;

     Birb.find({}, function(err, _DATA){
        if (err) throw err;
         for (i in _DATA) {
             var birb = _DATA[i].name.toLowerCase();

             if (!popular.hasOwnProperty(birb)) {
                 popular[birb] = 1;

             } else {
                 popular[birb] += 1;
             }

             if (popular[birb] > max) {
                 max = popular[birb];
                 popBirb = _DATA[i];
                 popBirb.spottings = max;
             }
         }

         res.render('popularbirbs', {popular_birb: popBirb});
     });
 });

 app.get('/featured', function(req, res) {
     Birb.find({}, function(err, _DATA){
        if (err) throw err;
         var randInt = getRndInteger(0, _DATA.length);
         var birb = _DATA[randInt];

         res.render('featuredbirb', {featured_birb: birb});
     });
 });

 // APIs

 app.get('/api/', function(req, res) {
     Birb.find({}, function(err, _DATA){
        if (err) throw err;
        res.json(_DATA);
    });
 });

 app.get('/api/add', function(req, res) {

     res.json({});
 });

 app.get('/api/winter', function(req, res) {
     var winter = {};

     Birb.find({}, function(err, _DATA){
        if (err) throw err;
         for (i in _DATA) {
             var birb = _DATA[i]

             if (birb.season.toLowerCase() == "winter") {
                 if (!winter.hasOwnProperty(birb.name)) {
                     winter[birb.name] = {};
                     winter[birb.name].name = birb.name;
                     winter[birb.name].color = birb.color;
                     winter[birb.name].spottings = 1;
                 } else {
                     winter[birb.name].spottings += 1;
                 }
             }
         }

         res.json(winter);
     });
 });

 app.get('/api/popular', function(req, res) {
     var popular = {};
     var max = 0;
     var popBirb;

     Birb.find({}, function(err, _DATA){
        if (err) throw err;
        for (i in _DATA) {
            var birb = _DATA[i].name.toLowerCase();

            if (!popular.hasOwnProperty(birb)) {
                popular[birb] = 1;
            } else {
                popular[birb] += 1;
            }

            if (popular[birb] > max) {
                max = popular[birb];
                popBirb = _DATA[i];
                popBirb.spottings = max;
            }
        }

        res.json(popBirb);
    });
 });

 app.get('/api/featured', function(req, res) {
     Birb.find({}, function(err, _DATA){
        if (err) throw err;
         var randInt = getRndInteger(0, _DATA.length);
         var birb = _DATA[randInt];

         res.json(birb);
     });
 });


app.listen(process.env.PORT || 3000, function() {
    console.log('Birbs listening on port 3000!');
});
