"use strict";

const $ = require('jquery');

module.exports.getMovieIds = (data) => {
    let movieIdArr = [];
    data.forEach(movie => {
        movieIdArr.push(movie.id);
    });
    return movieIdArr;
};

