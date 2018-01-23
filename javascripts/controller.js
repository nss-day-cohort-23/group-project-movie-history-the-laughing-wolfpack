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
        .then((data) => {
            let movieInfo = data;
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
        console.log('WATCHED: TORF', movieObject.watched, display );
        output.watchedMovies(movieObject, movieObject.actors, movieObject.fbKey);
    } else if (movieObject.watched === false && display === 'unwatched') {
        output.watchListMovies(movieObject, movieObject.actors, movieObject.fbKey);
    }
};

module.exports.startUserMovies = (data, display) => {
    console.log('FROM DELETE', data, display );
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
                movieObject.release_date = currentMovie.release_date;
                // console.log('Watched: ', movieObject.title, movieObject.actors, movieObject.fbKey );
                checkWatched(movieObject, display);
            })
            .catch((error) => {
                console.log('Error: ', error);
            });
    });
};












