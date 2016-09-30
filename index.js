var http = require('http');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();

// Mongo DB
var db;
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoUrl = 'mongodb://imaginamundo:senha1234@ds041526.mlab.com:41526/gugu';


// Static
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));

// bodyParser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

// View
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Get gugu
app.get('/list-gugu', (req, res) => {
    mongoClient.connect(mongoUrl, (err, database) => {
        // if (err) return console.log(err);
        db = database;
        var limit = 60;
        if (req.body.limit) {
            limit = red.body.limit;
        }
        
        var page = 1;
        if (req.body.page) {
            page = red.body.page;
        }

        var skip = 0;
        if (page > 1) {
            skip = (page - 1) * limit;
        }

        var findGugu = function(db, callback) {
            db.collection('gugu').find().sort({ _id: -1 }).limit(limit).skip(skip).toArray(function(erro, itens){
                

                // db.getCollection('gugu').find().limit(50) futura paginação :D
                // db.getCollection('gugu').
                res.json(itens);
            });
        };

        mongoClient.connect(mongoUrl, function(err, db) {
            assert.equal(null, err);
            findGugu(db, function() {
                db.close();
            });
        });
    });
});

// Post
app.post('/post-gugu', function (req, res) {
    console.log(req.body);

    if (req.body.gugu.length < 5 && req.body.date) {
        mongoClient.connect(mongoUrl, (err, database) => {
            // if (err) return console.log(err);
            db = database;
            db.collection('gugu').save(req.body, (err, result) => {
                // if (err) return console.log(err)
                console.log('Saved to database');
            });
        });
    }
    
});


  
// Server
var port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});