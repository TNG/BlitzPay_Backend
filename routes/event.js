var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

var DATABASE_URL = "mongodb://localhost:27017/test";
var EVENT_COLLECTION = 'event';

function makeId()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function createEventWithUniqueIdFromRequest(req) {
    var event = req.body;
    event.eventCode = makeId();
    MongoClient.connect(DATABASE_URL, function (err, db) {
        console.log("Successfully connected to our awesome database, yeah!");
        var collection = db.collection(EVENT_COLLECTION);
        var item = null;
        do {
            collection.findOne({"_id": req.params.id}, function (err, existingItem) {
                if (existingItem) {
                    item = existingItem;
                    event.eventCode = makeId();
                }
            });
        } while (item);
    });
    return event;
}
function persistEvent(event) {
    MongoClient.connect(DATABASE_URL, function (err, db) {
        console.log("Successfully connected to our awesome database, yeah!");
        var collection = db.collection(EVENT_COLLECTION);
        collection.insertOne({
            '_id': event.eventCode,
            'event': event
        });
    });
}
router.post('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var event = createEventWithUniqueIdFromRequest(req);
    persistEvent(event);
    res.status(201).json(event);
});

router.get('/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    MongoClient.connect(DATABASE_URL,function(err, db) {
        console.log("Successfully connected to our awesome database, yeah!");
        var collection = db.collection(EVENT_COLLECTION);
        collection.findOne({"_id" : req.params.id}, function(err, item){
            if(err || !item) {
                console.log("Could not retrieve event with id " + req.params.id);
                res.send(404);
                return;
            }
            res.json(item);
        });
    });
});



module.exports = router;
