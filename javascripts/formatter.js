"use strict";

const $ = require('jquery');
const movieFactory = require('./moviefactory');


module.exports.addFbKey = (data) => {
    let keys = Object.keys(data);
    keys.forEach(key => {
        data[key].fbId = key;
    });
    return data;
};

module.exports.getMovieIds = (data) => {
    let movieIdArr = [];
    let keys = Object.keys(data);
    keys.forEach(key => {
        data[key].fbId = key;
        movieIdArr.push(data[key].movieId);
        console.log("data with fbId?", data);
    });
    console.log("movieIdArr", movieIdArr);
    return movieIdArr;
};



