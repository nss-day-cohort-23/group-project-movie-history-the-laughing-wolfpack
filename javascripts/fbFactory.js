"use strict";

const $ = require('jquery');
const firebase = require('./config/fb-config');
const DOMInteraction = require('./DOMInteraction');

module.exports.addToWatchList = (movieObj) => {
    return new Promise( (resolve, reject) => {
        $.ajax({
            url: "https://movie-magic-21975.firebaseio.com/watchList.json",
            method: "POST",
            data: JSON.stringify(movieObj)
        }).done( movie => {
            resolve(movie);
        // }).fail( error => {
        //     reject(error);
        });
    });
};
