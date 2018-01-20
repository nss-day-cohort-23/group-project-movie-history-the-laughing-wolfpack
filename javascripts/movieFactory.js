"use strict";

const $ = require('jquery');
const firebase = require('./config/fb-config');
const movieKey = require('./config/movieCreds');

module.exports.searchNewMovie = (search) => {
   return new Promise( (resolve, reject) => {
       $.ajax({
           url: `https://api.themoviedb.org/3/search/movie?api_key=${movieKey.apiKey}&query=${search}`
       }).done( (data) => {
           resolve(data);
       }).fail( (error) => {
           reject(error);
       });
   });
};

module.exports.actorSearch = (movieId) => {
    return new Promise( (resolve, reject) => {
        $.ajax({
            url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${movieKey.apiKey}`
        }).done( (data) => {
            resolve(data);
        }).fail( (error) => {
            reject(error);
        });
    });
};