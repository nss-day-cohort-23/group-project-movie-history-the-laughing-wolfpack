"use strict";

const $ = require('jquery');
const firebase = require('./config/fb-config');
const movieKey = require('./config/movieCreds');

module.exports.searchMovies = (input) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://api.themoviedb.org/3/search/movie?api_key=${movieKey.apiKey}&query=${input}`
    }).done(data => {
      resolve(data.results);
    }).fail(error => {
      reject(error);
    });
  });
};

module.exports.getActors = (movieId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${movieKey.apiKey}`
    }).done(data => {
      resolve(data.cast);
    }).fail(error => {
      reject(error);
    });
  });
};

module.exports.getMovie = (movieId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${movieKey.apiKey}&language=en-US1`
    }).done(data => {
      resolve(data);
    }).fail(error => {
      reject(error);
    });
  });
};
