var express = require('express');
var router = express.Router();

function makeId()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

router.post('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var event = req.body;

    event.eventCode = makeId();
    while (typeof globalEvents[event.id] !== 'undefined') {
        event.eventCode = makeId();
    }
    globalEvents[event.eventCode] = event;
    res.json(event);
});

router.get('/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var event = globalEvents[req.params.id];
    if (typeof event === 'undefined') {
        res.send(404);

    }
    res.json(event)

});



module.exports = router;
