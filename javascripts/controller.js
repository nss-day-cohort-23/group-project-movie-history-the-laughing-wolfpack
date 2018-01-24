"use strict";

const $ = require('jquery');
const firebase = require('./config/fb-config');
const fbFactory = require('./fbFactory');
const movieFactory = require('./movieFactory');
const auth = require('./userFactory');
const formatter = require('./formatter');
const output = require('./DOMoutput');


module.exports.startSearch = () => {
  let searchNewVal = $("#findMovies").val().toLowerCase();
  movieFactory.searchMovies(searchNewVal)
    .then((movieInfo) => {
      movieInfo.forEach((movie) => {
        movieFactory.getActors(movie.id)
          .then((castArray) => {
            output.movieOutput(movie, castArray);
          })
          .catch((error) => {
            console.log('Error: ', error);
          });
      });
    });
};

let checkWatched = (movieObject, display) => {
  if (movieObject.watched === true && display === 'watched') {
    output.watchedMovies(movieObject, movieObject.actors, movieObject.fbKey);
    output.addHighlightedStars(movieObject);
  } else if (movieObject.watched === true && display === 'favorites' && movieObject.starRating > 6) {
    output.watchedMovies(movieObject, movieObject.actors, movieObject.fbKey);
    output.addHighlightedStars(movieObject);
  } else if (movieObject.watched === false && display === 'unwatched') {
    output.watchListMovies(movieObject, movieObject.actors, movieObject.fbKey);
  }
};

module.exports.startUserMovies = (data, display) => {
  let fbKeys = Object.keys(data);
  let movies = data;
  let movieReturnArray = [];
  fbKeys.forEach((key) => {
    let currentMovie = {};
    let movieId = movies[key].movieId;
    movieFactory.getMovie(movieId)
      .then((movie) => {
        currentMovie = movie;
        return movieFactory.getActors(currentMovie.id);
      })
      .then((cast) => {
        let movieObject = {};
        movieObject.title = currentMovie.title;
        movieObject.poster_path = currentMovie.poster_path;
        movieObject.actors = cast;
        movieObject.fbKey = key;
        movieObject.watched = movies[key].watched;
        movieObject.starRating = movies[key].starRating;
        movieObject.release_date = currentMovie.release_date;
        checkWatched(movieObject, display);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  });
};


