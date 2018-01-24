"use strict";

const $ = require('jquery');
const firebase = require('./config/fb-config');
const DOMInteraction = require('./DOMInteraction');
const fbURL = 'https://movie-magic-21975.firebaseio.com';

// UPDATE USER'S MOVIE
module.exports.updateUserMovie = (data, id) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${fbURL}/watchList/${id}.json`,
            method: 'PATCH',
            data: JSON.stringify(data)
        }).done((data) => {
            resolve(data);
        }).fail((error) => {
            reject(error);
        });
    });
};

// DELETE USER'S MOVIE
module.exports.deleteUserMovie = (id) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${fbURL}/watchList/${id}.json`,
            method: 'DELETE',
        }).done((data) => {
            resolve(data);
        }).fail((error) => {
            reject(error);
        });
    });
};

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

module.exports.checkMovies = (movieId) => {
    return new Promise( (resolve, reject) => {
        $.ajax({
            url: `https://movie-magic-21975.firebaseio.com/watchList.json?orderBy="movieId"&equalTo="${movieId}"`,
        }).done( movie => {
            resolve(movie);
        }).fail( error => {
            reject(error);
        });
    });
};

// UPDATES THE WATCHED KEY WHEN USERS CLICK "WATCHED"

