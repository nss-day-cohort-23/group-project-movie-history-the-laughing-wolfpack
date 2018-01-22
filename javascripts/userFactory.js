"use strict";

const $ = require('jquery');
const firebase = require('./config/fb-config');


module.exports.authUser = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider);
};

module.exports.logout = () => {
  return firebase.auth().signOut();
};
