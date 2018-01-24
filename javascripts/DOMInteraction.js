"use strict";

const $ = require('jquery');
const firebase = require('./config/fb-config');
const fbFactory = require('./fbFactory');
const movieFactory = require('./movieFactory');
const auth = require('./userFactory');
const output = require('./DOMoutput');
const controller = require('./controller');


///// USER LOGIN /////
$("#login").click(() => {
    auth
        .authUser()
        .then(function (result) {
            console.log("result", result);
            let user = result.user;
            console.log("user", user);
        })
        .catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
        });
});
///// USER LOGOUT /////
$("#logout").click(() => {
    auth.logout()
        .then(() => {
            console.log("You've been logged out!");
        });
});


///// START SEEACH NEW MOVIES /////
$("#findMovies").keydown((key) => {
    $('#findMoviesContainer').html('');
    let newSearchArr = [];
    if (key.which === 13) {
        controller.startSearch();
    }
    $("#findMovies").keyup((key) => {
        if (key.which === 13) {
            $("#findMovies").val('');
        }
    });
});


///// ADD TO WATCHLIST /////
$(document).on("click", ".addToWatch", function () {
    let addedMovieId = $(this).attr("id");
    let currentUser = firebase.auth().currentUser;
    let movieObj = {
        movieId: addedMovieId,
        uid: currentUser.uid,
        watched: false,
        rating: null
    };
    fbFactory.addToWatchList(movieObj)
        .then((data) => {
        });
});


///// DELETE UWATCHED MOVIE /////
$(document).on("click", ".delete_button", function () {
    let deleteMovieId = $(this).attr("id");
    fbFactory.deleteUserMovie(deleteMovieId)
        .then(() => {
            return fbFactory.getMovies(firebase.auth().currentUser.uid);
        })
        .then((data) => {
            $('#findMoviesContainer').html('');
            let display = 'unwatched';
            controller.startUserMovies(data, display);
        })
        .catch(error => {
            console.log("error", error);
        });

});

///// DELETE WATCHED MOVIE /////
$(document).on("click", ".delete_watched", function () {
    let deleteMovieId = $(this).attr("id");
    fbFactory.deleteUserMovie(deleteMovieId)
        .then(() => {
            return fbFactory.getMovies(firebase.auth().currentUser.uid);
        })
        .then((data) => {
            $('#findMoviesContainer').html('');
            let display = 'watched';
            controller.startUserMovies(data, display);
        })
        .catch(error => {
            console.log("error", error);
        });
});

///// ADD TO WATCHED /////
$(document).on('click', '.watched-button', function () {
    let fbId = this.id.slice(8);
    let watched = {
        watched: true
    };
    fbFactory.updateUserMovie(watched, fbId)
        .then(() => {
            return fbFactory.getMovies(firebase.auth().currentUser.uid);
        })
        .then((data) => {
            controller.startUserMovies(data);
        });
    $(this).parent().hide().fadeOut(100);
});

///// DISPLAY UNWATCHED /////
$('#displayUnwatched').on('click', function () {
    $('#findMoviesContainer').html('');
    let display = 'unwatched';
    fbFactory.getMovies(firebase.auth().currentUser.uid)
        .then((data) => {
            controller.startUserMovies(data, display);
        });
});

///// DISPLAY WATCHED /////
$('#displayWatched').on('click', function () {
    $('#findMoviesContainer').html('');
    let display = 'watched';
    fbFactory.getMovies(firebase.auth().currentUser.uid)
        .then((data) => {
            controller.startUserMovies(data, display);
        });
});

/******* STAR RATING ***********/

$(document).on("click", ".starRating", function() {

    // Get user
    let updatedMovieId = $(this).parent().attr("id");
    console.log("star clicked this", $(this).parent().attr("id") );
    let movieObj = {};

    // All stars in the div
    let stars = $(this).parent().children("i");
    console.log("stars", stars);

    // Star that was currently selected
    let clickedStar = parseInt($(this).attr("value"));
    console.log("ClickedStar", clickedStar);

    // Adding the star rating to the movieObj
    movieObj.starRating = clickedStar;
    movieObj.watched = true;

    // Loop over the stars and remove class highlighted for each one.
    for(let i = 0; i < stars.length; i++) {
        $(stars[i]).removeClass("highlighted");
        console.log("stars loop", stars[i]);
    }
    // Loop over the stars and highlight the correct number of stars
    for(let i = 0; i < clickedStar; i++) {
        $(stars[i]).addClass("highlighted");
    }
    console.log("movie star clicked movie obj", movieObj);
    console.log("movie star clicked updatedMovieId", updatedMovieId);
    fbFactory.updateUserMovie(movieObj, updatedMovieId);
});
