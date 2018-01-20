"use strict";

const $ = require('jquery');
const firebase = require('./config/fb-config');
const fbFactory = require('./fbFactory');
const movieFactory = require('./movieFactory');
const auth = require('./userFactory');
const formatter = require('./formatter');
const output = require('./DOMoutput');

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
// let promiseArr = [
//     movieFactory.searchNewMovie(searchVewVal),
//     movieFactory.actorSearch(movieIds)
// ]

// movieFactory.actorSearch([206647]);
// console.log("movieFactory.actorSearch([206647])", movieFactory.actorSearch([206647]));

//ATTEMPTNG TO GET THE CAST
// $("#findMovies").keydown( (key) => {
//     let newSearchArr = [];
//     if(key.which === 13) {
//         $("#findMoviesContainer").html('');
//         let searchNewVal = $("#findMovies").val().toLowerCase();
//         movieFactory.searchNewMovie(searchNewVal)
//         .then( (data) => {
//             let movieInfo = data.results;
//             let movieIds = formatter.getMovieIds(movieInfo);
//             console.log("movieIds", movieIds);
//             return movieFactory.castSearch(movieIds);
//             // movieInfo.forEach( (movie) => {
//             //     output.movieOutput(movie);
//             // });
//             // console.log("movieInfo", movieInfo);
//         }).then( (actors) => {
//             console.log("actors detail?", actors);
//         });
//     }
//     $("#findMovies").keyup( (key) => {
//         if (key.which === 13) {
//             $("#findMovies").val('');
//         }
//     });
// });

// This gets movies with no actors
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
            console.log("movieInfo", movieInfo);
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

$(document).on("click", ".addToWatch", function() {
   let addedMovieId = $(this).attr("id");
   let currentUser = firebase.auth().currentUser;
   console.log("currentUser", currentUser);
   let movieObj = {
       movieId: addedMovieId,
       uid: currentUser.uid,
       watched: false,
       rating: null
   };
   fbFactory.addToWatchList(movieObj)
   .then( (data) => {
       console.log("is anything happening", data);
   });
});
