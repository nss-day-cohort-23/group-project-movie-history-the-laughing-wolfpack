"use strict";

const $ = require('jquery');
const firebase = require('./config/fb-config');
const fbFactory = require('./fbFactory');
const movieFactory = require('./movieFactory');
const auth = require('./userFactory');
const  formatter = require('./formatter');
const  output = require('./DOMoutput');

console.log("is this working?");

// USER LOGIN
$("#login").click (() => {
    auth
    .authUser()
    .then(function(result) {
    console.log("result", result);
    // The signed-in user info.
    let user = result.user;
    console.log("user", user);
    //   displayTodos(user.uid);
    })
    .catch(function(error) {
    // Handle Errors here.
    //   console.log("error message", errorMessage);
        let errorCode = error.code;
        let errorMessage = error.message;
    });
});

// USER LOGOUT
$("#logout").click( () => {
    auth.logout()
    .then ( () => {
        console.log("You've been logged out!");
    });
});


// USER SEARCH FOR NEW MOVIES


$("#findMovies").keydown( (key) => {
    let newSearchArr = [];
    if(key.which === 13) {
        $("#findMoviesContainer").html('');
        let searchNewVal = $("#findMovies").val().toLowerCase();
        movieFactory.searchNewMovie(searchNewVal)
        .then( (data) => {
            let movieInfo = data.results;
            movieInfo.forEach( (movie) => {
                output.movieOutput(movie);
            });
        });
    }
    $("#findMovies").keyup( (key) => {
        if (key.which === 13) {
            $("#findMovies").val('');
        }
    });
});


// USER SEARCH FOR MY MOVIES
$("#myMovieSearch").keydown( (key) => {
    if (key.which === 13) {
        let searchMyMovies = $("#myMovieSearch").val().toLowerCase();
    }
    $("#myMovieSearch").keyup( (key) => {
        if (key.which === 13) {
            $("#myMovieSearch").val('');
        }
    });
});
