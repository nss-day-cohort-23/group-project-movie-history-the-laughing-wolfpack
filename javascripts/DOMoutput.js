"use strict";

const $ = require('jquery');
const movieKey = require('./config/movieCreds');

module.exports.movieOutput = (data) => {
    $("#findMoviesContainer").append(
        `<div class="movieCard" id=${data.id}>
        <h7>${data.title} <i>(${data.release_date})</i></h7>
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="moviePoster" alt="No Movie Poster Available">
        <a href="#" class="addToWatch" id=${data.id}>Add To Watch List</a>
        </div>`
    );
};

module.exports.watchListMovies = (data) => {
    $("#findMoviesContainer").append(
        `<div class="movieCard" id=${data.id}>
        <h7>${data.title} <i>(${data.release_date})</i></h7>
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="moviePoster" alt="No Movie Poster Available">
        <a href="#" class="addWatched" id=${data.id}>Watched</a>
        </div>`
    );
};

module.exports.watchedMovies = (data) => {
    $("#findMoviesContainer").append(
        `<div class="movieCard" id=${data.id}>
        <h7>${data.title} <i>(${data.release_date})</i></h7>
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="moviePoster" alt="No Movie Poster Available">
        <a href="#" class="watched" id=${data.id}>Some Rating</a>
        </div>`
    );
};

