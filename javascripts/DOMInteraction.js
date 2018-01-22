"use strict";

const $ = require('jquery');
const firebase = require('./config/fb-config');
const fbFactory = require('./fbFactory');
const movieFactory = require('./movieFactory');
const auth = require('./userFactory');
const formatter = require('./formatter');
const output = require('./DOMoutput');

// USER LOGIN
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

// USER LOGOUT
$("#logout").click(() => {
    auth.logout()
        .then(() => {
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


$("#findMovies").keydown((key) => {
    let newSearchArr = [];
    if (key.which === 13) {
        $('#findMoviesContainer').html('');
        $("#searchedMovies").html('');
        let searchNewVal = $("#findMovies").val().toLowerCase();

        movieFactory.searchMovies(searchNewVal)
            .then((data) => {
                let movieInfo = data;
                movieInfo.forEach((movie) => {
                    movieFactory.getActors(movie.id)
                        .then((castArray) => {
                            output.movieOutput(movie, castArray);
                        })
                        .catch((error) => {
                            console.log('Error: ', error);
                        });
                });

            });
    }


    $("#findMovies").keyup((key) => {
        if (key.which === 13) {
            $("#findMovies").val('');
        }
    });
});


// USER SEARCH FOR MY MOVIES
$("#myMovieSearch").keydown((key) => {
    if (key.which === 13) {
        let searchMyMovies = $("#myMovieSearch").val().toLowerCase();
    }
    $("#myMovieSearch").keyup((key) => {
        if (key.which === 13) {
            $("#myMovieSearch").val('');
        }
    });
});



/**** MOVIE CARD INTERATION ****/

// USER CLICKS "ADD TO WATCH"
$(document).on("click", ".addToWatch", function () {
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
        .then((data) => {
            //    console.log("is anything happening", data);
        });
});

// USER CLICKS "WATCHED"
$(document).on("click", ".addWatched", function () {
    console.log("watched clicked");
    let movieId = this.id;
    console.log("movieId", movieId);

    fbFactory.updateWatched(movieId);
});

// GET USER'S MOVIES
// Get movie id's from getMovies
$(document).on("click", "#myMovieNav", function () {
    $("#findMoviesContainer").html('');
    let currentUser = firebase.auth().currentUser.uid;
    console.log("My Movies was clicked");
    console.log("currentUser", currentUser);

    // This promise gets the current user's movies
    fbFactory.getMovies(currentUser)
        .then((data) => {
            console.log("current user's data", data);

            // This getMovieIds function get's all the movie ids from the user's movies(data)
            // let addingFbId = formatter.addFbKey(data);
            // console.log("add keys", addingFbId);
            let usersMovieIds = formatter.getMovieIds(data);
            console.log("get movie Ids", usersMovieIds);

            // For each movie id I want to run the getMyMovies promise to get each movie's info
            usersMovieIds.forEach(id => {
                movieFactory.getMovie(id)
                    .then(movie => {
                        console.log("this isn't going to work", movie);
                        output.watchListMovies(movie);
                    });
            });
        }).catch(error => {
            console.log("error", error);
        });
});

/////Unwatched List /////
/////Click Unwatched List /////

$('#displayUnwatched').on('click', function () {
    fbFactory.getMovies(firebase.auth().currentUser.uid)
        .then((data) => {
            startUnwatchedMovies(data);
        });
});

let startUnwatchedMovies = (data) => {
    $('#myMoviesContainer').html('');
    $('#findMoviesContainer').html('');
    let fbKeys = Object.keys(data);
    // console.log('fbKeys', fbKeys );
    let movies = data;
    fbKeys.forEach((key) => {
        if (firebase.auth().currentUser.uid === movies[key].uid && movies[key].watched === false) {
            console.log('For Each:', key);
            let currentMovie = {};
            let movieId = movies[key].movieId;
            movieFactory.getMovie(movieId)
                .then((movie) => {
                    currentMovie = movie;
                    return movieFactory.getActors(currentMovie.id);
                })
                .then((actors) => {
                    output.watchListMovies(currentMovie, actors, key);
                })
                .catch((error) => {
                    console.log('Error: ', error);
                });
        }
    });
};







