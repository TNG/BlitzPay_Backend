var express = require('express');
var router = express.Router();

router.get('/:id', function (req, res, next) {

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
    res.send("Could not find event wit Id " + req.params.id + " current events: " + resp);
});

router.post('/', function (req, res, next) {
    var event = req.body;
    event.eventId = globalEvents.length + 38;
    globalEvents.push(event);
    res.send("New event was created with id: " + event.eventId);
});

module.exports = router;
