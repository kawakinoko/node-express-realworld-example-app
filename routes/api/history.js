var router = require('express').Router();
var mongoose = require('mongoose');
var History = mongoose.model('History');
var auth = require('../auth');

router.get('/', auth.required, function(req, res, next) {
    var query = {};
    var limit = 20;
    var offset = 0;

    if(typeof req.query.limit !== 'undefined'){
        limit = req.query.limit;
    }

    if(typeof req.query.offset !== 'undefined'){
        offset = req.query.offset;
    }

    return Promise.all([
        History.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({createdAt: 'desc'})
            .populate('author')
            .exec(),
        History.count(query).exec()
    ]).then(function(results){
        var histories = results[0];
        var historiesCount = results[1];

        return res.json({
            histories: histories.map(function(history){
                return history.toJSON();
            }),
            historiesCount: historiesCount
        });
    }).catch(next);
});

module.exports = router;
