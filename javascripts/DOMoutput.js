"use strict";

const $ = require('jquery');
const movieKey = require('./config/movieCreds');

module.exports.movieOutput = (data, castArray) => {
    $("#findMoviesContainer").append(
        `<div class="movieCard" id=${data.id}>
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="moviePoster" alt="No Movie Poster Available">
        <br>
        <h7>${data.title} <i>(${data.release_date.slice(0, 4)})</i></h7>
          <ul>
          <li>${castArray[0].name}</li>
          <li>${castArray[1].name}</li>
          <li>${castArray[2].name}</li>
          <li>${castArray[3].name}</li>
          <li>${castArray[4].name}</li>
          <a href="#" class="addToWatch" id=${data.id}>Add To Watch List</a>      
        </div>`
    );
};

module.exports.watchListMovies = (data) => {
    $("#findMoviesContainer").append(
        `<div class="movieCard" id=${data.id}>
        <button type="button"> DELETE </button>
        <h7>${data.title} <i>(${data.release_date.slice(0, 4)})</i></h7>
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="moviePoster" alt="No Movie Poster Available">
        <a href="#" class="addWatched" id=${data.id}>Watched</a>
        </div>`
    );
};

module.exports.watchedMovies = (data) => {
    $("#findMoviesContainer").append(
        `<div class="movieCard" id=${data.id}>
        <button type="button"> DELETE </button><br>
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="moviePoster" alt="No Movie Poster Available"><br>
        <h7>${data.title} <i>(${data.release_date.slice(0, 4)})</i></h7>
        <a href="#" class="watched" id=${data.id}>Some Rating</a>
        </div>`
    );
};

