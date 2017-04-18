"use strict";

$(document).ready(function(){

    // Get users with id 1 and 2 from the mock-API. Also GET ALBUMS associated with these two USERS.
    const api = "https://jsonplaceholder.typicode.com"
    const albums = api+"/albums";
    const user = albums+"?userId=";
    var id;

    getAlbums();
    getUser(user,1);
    getUser(user,2);

    // Get all albums
    function getAlbums(){
      $.get( albums, function(data) {
      })
      .done(function(albumObj) {
        console.log(albumObj[90]["userId"]);
      })
      .fail(function() {
        alert( "error" );
      });
     }

    // Get single user
    function getUser(user,id) {
     $.get( user+id, function(data) {
     })
     .done(function(albumObj) {
       console.log(albumObj);
     })
     .fail(function() {
       alert( "error" );
     });
   }

});
