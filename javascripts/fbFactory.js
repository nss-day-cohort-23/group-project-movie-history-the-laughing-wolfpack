"use strict";

const $ = require('jquery');
const firebase = require('./config/fb-config');

module.exports.getUserMovies = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${fbURL}/watchList.json`
        }).done((data) => {
            resolve(data);
        }).fail((error) => {
            reject(error);
        });
    });
};

module.exports.storeUserMovie = (movie) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${fbURL}/watchList.json`,
            method: 'POST',
            data: JSON.stringify(movie)
        }).done((data) => {
            resolve(data);
        }).fail((error) => {
            reject(error);
        });
    });
};

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

