"use strict";

const $ = require('jquery');
const movieKey = require('./config/movieCreds');

// data = full movie Object; castArray = array of cast for movie
module.exports.movieOutput = (data, castArray) => {
    $("#findMoviesContainer").append(
        `<div class="movieCard" id=${data.id}>
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="moviePoster" alt="No Movie Poster Available" width='260px' height='370px'>
        <br>
        <h7>${data.title} <i>(${data.release_date.slice(0, 4)})</i></h7>
        <ul>
        <li>${castArray[0].name}</li>
        <li>${castArray[1].name}</li>
        <li>${castArray[2].name}</li>
        <a href="#" class="addToWatch" id=${data.id} class>Add To Watch List</a>      
        </div>`
    );
};

module.exports.watchListMovies = (movie, actors, fbId) => {
    // console.log('output: watch', movie, actors, fbId );
    $('#findMoviesContainer').append(`
    <div class="movieCard">
    <img src='https://image.tmdb.org/t/p/w500/${movie.poster_path}' width='260px' height='370px'>
    <h2>${movie.title} (${movie.release_date.slice(0, 4)})</h2>
    <h3>Starring: </h3>
    <ul>
    <li>${actors[0].name}</li>
    <li>${actors[1].name}</li>
    <li>${actors[2].name}</li>
    </ul>
    <button id='watched-${fbId}' class='watched-button'>Watched</button>
    <button id='${fbId}' class='delete_button'>Delete</button><br>
    </div>
    <div class="starRatings" id='${fbId}'>
    <i class="fa fa-star starRating" value="1"></i>
    <i class="fa fa-star starRating" value="2"></i>
    <i class="fa fa-star starRating" value="3"></i>
    <i class="fa fa-star starRating" value="4"></i>
    <i class="fa fa-star starRating" value="5"></i>
    <i class="fa fa-star starRating" value="6"></i>
    <i class="fa fa-star starRating" value="7"></i>
    <i class="fa fa-star starRating" value="8"></i>
    <i class="fa fa-star starRating" value="9"></i>
    <i class="fa fa-star starRating" value="10"></i>
    <div>`
);
};

module.exports.watchedMovies = (movie, actors, fbId) => {
    // console.log('output: watched', movie, actors, fbId );
    $('#findMoviesContainer').append(`
    <div class="movieCard">
        <img src='https://image.tmdb.org/t/p/w500/${movie.poster_path}' width='260px' height='370px'>
        <h2>${movie.title} (${movie.release_date.slice(0, 4)})</h2>
        <h3>Starring: </h3>
        <ul>
            <li>${actors[0].name}</li>
            <li>${actors[1].name}</li>
            <li>${actors[2].name}</li>
        </ul>
        <button id='watched-${fbId}' class='watched-button'>Watched</button>
        <button id='${fbId}' class='delete_watched'>Delete</button><br>
        </div>
        <div class="starRatings" id='${fbId}'>
        <i class="fa fa-star starRating" value="1"></i>
        <i class="fa fa-star starRating" value="2"></i>
        <i class="fa fa-star starRating" value="3"></i>
        <i class="fa fa-star starRating" value="4"></i>
        <i class="fa fa-star starRating" value="5"></i>
        <i class="fa fa-star starRating" value="6"></i>
        <i class="fa fa-star starRating" value="7"></i>
        <i class="fa fa-star starRating" value="8"></i>
        <i class="fa fa-star starRating" value="9"></i>
        <i class="fa fa-star starRating" value="10"></i>
        <div>`
    );
};

