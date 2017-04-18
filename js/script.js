"use strict";
// Note 'var' is supported in all broswers
// But the ES6 'let' key word is not supported in firefox so I chose to use var instead of let

// Get users with id 1 and 2 from the mock-API. Also GET ALBUMS associated with these two USERS.
const api = "https://jsonplaceholder.typicode.com"
const albums = api+"/albums";
const user = api+"/users?id=";
var id;

$(document).ready(function(){
    getAlbums();

    function getAlbums(){
      var user1Albums=[];
      var user2Albums=[];
      $.get( albums, function(data) {
      })
      .done(function(albumObj) {
        albumObj.map(function(album, i){
          if(album.userId == 1){
            // closure allows to change the outer function's variable
            user1Albums.push( album);
          }
          if(album.userId == 2){
            // closure allows to change the outer function's variable
            user2Albums.push( album);
          }
        })
      })
      .fail(function() {
        alert( "error" );
      });
      // callbacks
      getUser(user, 1, user1Albums);
      getUser(user, 2, user2Albums);
    }

    // Get single user agetAlbumslbums
    function getUser(user,id, userAlbums) {
      // The data will return only when all the object values are returned for each promise.
       $.get( user+id, function(data) {
       })
       .done(function(albumObj) {
         var name = '<div class="user-name">user name: '+albumObj[0].name+'</div>';
         $('.container').append(name);
         for(var i=0; i < userAlbums.length; i++){
           $('.container').append(
             '<div class="user-table">'+
               '<ul class="album-row">'+
                 '<li class="id-column"> album Id: '+userAlbums[i].id+'</li>'+
                ' <li class="title-column"> album Title: '+userAlbums[i].title+'</li>'+
              '</ul>'+
             '</div>'
           )
        }
       })
       .fail(function() {
         alert( "error" );
       });
  }

});
