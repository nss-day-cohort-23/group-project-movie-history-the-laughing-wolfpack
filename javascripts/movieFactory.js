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

module.exports.castSearch = (movieId) => {
    movieId.forEach( (id) => {
        console.log("actorSearch promise is running");
        console.log("id", id);
        return new Promise( (resolve, reject) => {
            $.ajax({
                url: `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${movieKey.apiKey}`
            }).done( (data) => {
                console.log("data", data);
                resolve(data);
            }).fail( (error) => {
                reject(error);
            });
        });
    });
};