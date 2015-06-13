var express = require('express');
var router = express.Router();

router.get('/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var resp = "";
    for (var i = 0; i < globalEvents.length; i++) {
        var event = globalEvents[i];
        var id = event.eventId;
        resp = resp + id;

        if (id == req.params.id) {
            res.json(event);
            return;
        }
    }
    res.send(404);
});

router.post('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var event = req.body;
    event.eventId = globalEvents.length + 38;
    globalEvents.push(event);
    res.send("New event was created with id: " + event.eventId);
});

module.exports = router;
