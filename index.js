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
var mongoUrl = process.env.MONGO_URL;

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

function isInt(n) {
    return n % 1 === 0;
}
// Get gugu
app.get('/list-gugu', (req, res) => {
    
    var limit = 60;
    if (req.query.limit && isInt(req.query.limit)) {
        limit = req.query.limit;
    }
    
    var page = 1;
    if (req.query.page && isInt(req.query.page)) {
        page = req.query.page;
    }

    var skip = 0;
    if (page > 1) {
        skip = (page - 1) * limit;
    }

    db.collection('gugu').find().sort({ _id: -1 }).limit(limit).skip(skip).toArray(function(erro, itens){

        // db.getCollection('gugu').find().limit(50) futura paginação :D
        // db.getCollection('gugu').
        res.json(itens);
    });
    
});

// Post
app.post('/post-gugu', function (req, res) {

    if (req.body.gugu.length < 5 && req.body.date) {
        // Time
        var currentTime = new Date();

        var postJson = {
            'gugu': req.body.gugu,
            'date': currentTime
        }

        db.collection('gugu').save(postJson, (err, result) => {
            console.log('Saved to database');
        });
    }
    res.sendStatus(201);
});


  
// Server
var port = process.env.PORT || 8080;

mongoClient.connect(mongoUrl, function(err, database) {
    if(err) throw err;

    db = database;

    app.listen(port, function () {
        console.log('Example app listening on port ' + port + '!');
    });
});