"use strict";

const $ = require('jquery');
const movieKey = require('./config/movieCreds');

module.exports.movieOutput = (data, castArray) => {
    $("#findMoviesContainer").append(
        `<div class="col-md-4"> <div class="card bg-light mb-5" style="width: 18rem;" id=${data.id}>
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="card-img-top" alt="No Movie Poster Available" width='260px' height='370px'>
        <br>
        <h4 class="card-title text-center">${data.title} <i><h6 class="text-muted">(${data.release_date.slice(0, 4)})</h6></i></h4>
          <ul class="list-group list-group-flush pt-0">
          <li class="list-group-item">${castArray[0].name}</li>
          <li class="list-group-item">${castArray[1].name}</li>
          <li class="list-group-item">${castArray[2].name}</li>
          <li class="list-group-item">${castArray[3].name}</li>
          <li class="list-group-item">${castArray[4].name}</li>
          </ul>
          <a href="#" class="card-link rounded-bottom text-center bg-secondary text-white" id=${data.id}>Add To Watch List</a>      
        </div></div>`
    );
};

module.exports.watchListMovies = (movie, actors, fbId) => {
    console.log('Actors: ', actors);
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
        </div>`
    );
};

module.exports.watchedMovies = (data) => {
    $("#findMoviesContainer").append(
        `<div class="movieCard" id=${data.id}>
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="moviePoster" alt="No Movie Poster Available"><br>
        <h7>${data.title} <i>(${data.release_date.slice(0, 4)})</i></h7>
        <a href="#" class="watched" id=${data.id}>Some Rating</a>
        <button type="button" id=""> DELETE </button><br>
        </div>`
    );
};

