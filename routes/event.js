var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
    var event = {
        "eventId": req.params.id,
        "name": "lunch",
        "amount": 52,
        "currency": "EUR",
        "creator": {
            "name": "Franzi",
            "address": req.params.id
        }
    };
    res.json(event);
});

router.post('/', function(req, res, next) {
    var event = req.body;

    res.send("New event was created " + JSON.stringify(event));
});

module.exports = router;
