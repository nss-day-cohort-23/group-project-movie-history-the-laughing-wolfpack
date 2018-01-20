"use strict";

const $ = require('jquery');
const movieKey = require('./config/movieCreds');

module.exports.movieOutput = (data) => {
    $("#findMoviesContainer").append(
        `<div class="movieCard">
        <h7>${data.title} <i>(${data.release_date})</i></h7>
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="moviePoster" alt="No Movie Poster Available">
        <a class="addToWatch">Add To Watch List<a>
        </div>`
    );
};