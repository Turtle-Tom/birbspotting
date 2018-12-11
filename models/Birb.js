var mongoose = require("mongoose");

var birbSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    state:{
        type: String,
        required: true
    },

    color:{
        type: String,
        required: true
    },

    spotter:{
        type: String,
        required: true
    },

    season:{
        type: String,
        required: true
    },

    size:{
        type: Number,
        required: true
    },

    characteristics:{
        type: Array,
        required: true
    }
});

var Birb = mongoose.model('Birb', birbSchema);

module.exports = Birb;
