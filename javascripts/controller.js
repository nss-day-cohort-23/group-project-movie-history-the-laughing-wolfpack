"use strict";

const $ = require('jquery');
const firebase = require('./config/fb-config');
const fbFactory = require('./fbFactory');
const movieFactory = require('./movieFactory');
const auth = require('./userFactory');
const formatter = require('./formatter');
const output = require('./DOMoutput');

// Build a controller that builds an object with the information needed from FireBase and the Movie API

// Info needed 

    // Title
    // Poster
    // Year
    // Cast
    // UID 
    // FB Key
    


module.exports.createMovieObj = (searchNewVal, currentUser) => {
    let movieObj = {};
    // console.log("searchNewVal", searchNewVal);
    movieFactory.searchMovies(searchNewVal)
    .then( (movies) => {
        console.log("movies from API", movies);
        movies.forEach( movie => {
            movieObj.title = movie.title;
            movieObj.id = movie.id;
            movieObj.releaseDate = movie.release_date;
            movieObj.posterPath = movie.poster_path;
        });
        console.log("search controller movie obj", movieObj);
        return movieObj;
    });
    fbFactory.getMovies(currentUser)
    .then( (movies) => {
        movies.forEach ( movie => {
            let key = Object.keys(movie);
            movieObj.fbId = key;
            movieObj.rating = movie.rating;
        });
        console.log("FB controller movie obj", movieObj);
        return movieObj;
        });
    return movieObj;
    };


module.exports.searchedMovieObj = (searchNewVal) => {
    // Create an array to hold the movie objects
    let searchedMovieArr = [];
    // Call the movieFactory.searchMovies function to get movies from API
    movieFactory.searchMovies(searchNewVal)
    .then( (movies) => {
        console.log("movies from API", movies);
        // Loop over each movie and add the needed information to the movie object.
        movies.forEach( movie => {
            // Create a movie object for each movie
            let movieObj = {};
            movieObj.title = movie.title;
            movieObj.id = movie.id;
            movieObj.releaseDate = movie.release_date;
            movieObj.posterPath = movie.poster_path;
            // Push each movie into the searchedMovieArr
            searchedMovieArr.push(movieObj);
        });
        output.movieOutput(searchedMovieArr);
    });
    console.log("searched Movie Arr", searchedMovieArr);
};