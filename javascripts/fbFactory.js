"use strict";

const $ = require('jquery');
const firebase = require('./config/fb-config');
const DOMInteraction = require('./DOMInteraction');

// ADD MOVIES TO FIREBASE
module.exports.addToWatchList = (movieObj) => {
    return new Promise( (resolve, reject) => {
        $.ajax({
            url: "https://movie-magic-21975.firebaseio.com/watchList.json",
            method: "POST",
            data: JSON.stringify(movieObj)
        }).done( movie => {
            resolve(movie);
        }).fail( error => {
            reject(error);
        });
    });
};

// GETS USERS MOVIES FROM FIREBASE 
module.exports.getMovies = (uid) => {
    return new Promise( (resolve, reject) => {
        $.ajax({
            url: `https://movie-magic-21975.firebaseio.com/watchList.json?orderBy="uid"&equalTo="${uid}"`,
        }).done( movie => {
            resolve(movie);
        }).fail( error => {
            reject(error);
        });
    });
};

// UPDATES THE WATCHED KEY WHEN USERS CLICK "WATCHED"
module.exports.updateWatched = (id) => {
    return new Promise( (resolve, reject) => {
        $.ajax({
            url: `https://movie-magic-21975.firebaseio.com/watchList/${id}.json`,
            method: "PATCH",
            data: JSON.stringify({watched: true})
        }).done( data => {
            resolve(data);
        }).fail( error => {
            reject(error);
        });
    });
};
