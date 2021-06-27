var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var HistorySchema = new mongoose.Schema({
    type: String,
    from: {
        slug: {type: String, lowercase: true},
        title: String,
        description: String,
        body: String,
        favoritesCount: {type: Number, default: 0},
        tagList: [{type: String}]
    },
    to: {
        slug: {type: String, lowercase: true},
        title: String,
        description: String,
        body: String,
        favoritesCount: {type: Number, default: 0},
        tagList: [{type: String}]
    },
}, {timestamps: true});

HistorySchema.methods.toJSON = function(){
    return {
        type: this.type,
        from: {
            slug: this.from.slug,
            title: this.from.title,
            description: this.from.description,
            body: this.from.body,
            createdAt: this.from.createdAt,
            updatedAt: this.from.updatedAt,
            tagList: this.from.tagList
        },
        to: {
            slug: this.to.slug,
            title: this.to.title,
            description: this.to.description,
            body: this.to.body,
            createdAt: this.to.createdAt,
            updatedAt: this.to.updatedAt,
            tagList: this.to.tagList
        },
    };
};

mongoose.model('History', HistorySchema);
