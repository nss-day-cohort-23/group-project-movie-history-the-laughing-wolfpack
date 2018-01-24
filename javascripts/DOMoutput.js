"use strict";

const $ = require('jquery');
const movieKey = require('./config/movieCreds');

module.exports.movieOutput = (data, castArray) => {
    $("#findMoviesContainer").append(
        `<div class="movieCard" id=${data.id}>
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="moviePoster" alt="No Movie Poster Available" width='260px' height='370px'>
        <br>
        <h4>${data.title} <i>(${data.release_date.slice(0, 4)})</i></h4>
        <h6>Starring: </h6>
        <ul>
        <li>${castArray[0].name}</li>
        <li>${castArray[1].name}</li>
        <li>${castArray[2].name}</li>
        <button type = "button" id='${data.id}' class='addToWatch btn btn-secondary'>Add To Watch List</button>
        </div>`
    );
};

module.exports.watchListMovies = (movie, actors, fbId) => {
    $('#findMoviesContainer').append(`
    <div class="movieCard">
    <img src='https://image.tmdb.org/t/p/w500/${movie.poster_path}' width='260px' height='370px'>
    <h4>${movie.title} (${movie.release_date.slice(0, 4)})</h4>
    <h6>Starring: </h6>
    <ul>
    <li>${actors[0].name}</li>
    <li>${actors[1].name}</li>
    <li>${actors[2].name}</li>
    </ul>
    <button type = "button" id='${fbId}' class='delete_button btn btn-secondary'>Delete</button><br>

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
    </div>`
);
};

module.exports.watchedMovies = (movie, actors, fbId) => {
    $('#findMoviesContainer').append(`
    <div class="movieCard">
        <img src='https://image.tmdb.org/t/p/w500/${movie.poster_path}' width='260px' height='370px'>
        <h4>${movie.title} (${movie.release_date.slice(0, 4)})</h4>
        <h6>Starring: </h6>
        <ul>
            <li>${actors[0].name}</li>
            <li>${actors[1].name}</li>
            <li>${actors[2].name}</li>
        </ul>
        <button type = "button" id='${fbId}' class='delete_button btn btn-secondary'>Delete</button><br>

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
        </div>`
    );
};

module.exports.addHighlightedStars = (movie) => {
  let elm = `div.starRatings#${movie.fbKey}`;
  let stars = $(elm).children("i");
  for(let i = 0; i < movie.starRating; i++) {
      $(stars[i]).addClass("highlighted");
  }
};

// receives selected value and prints to breadcrumbs trail
module.exports.displaySearchPath = (selectedPath) => {
    let pathToPrint = (selectedPath[0].toUpperCase() + selectedPath.substring(1));
    $("#currentSection").html(`${pathToPrint}`);
};