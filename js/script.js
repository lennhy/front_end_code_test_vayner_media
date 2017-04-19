"use strict";
// Note I chose to use the keyword 'var' instead of ES6 'let' because var is better suported in all broswers

// Get users with id 1 and 2 from the mock-API. Also GET ALBUMS associated with these two USERS.
const api = "https://jsonplaceholder.typicode.com"
const albums = api+"/albums";
const user = api+"/users?id=";
var id;

$(document).ready(function(){
    getAlbums();

    // ---------------------------------- GET DATA

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
        console.log( "error" );
      });
      // callbacks
      getUser(user, 1, user1Albums);
      getUser(user, 2, user2Albums);
    }

    // Get single user getAlbumslbums
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
               `<ul id="album-row-${userAlbums[i].id}"` + " "+  'draggable="true">'+
                 '<li class="id-column"> album Id: '+userAlbums[i].id+'</li>'+
                ' <li class="title-column"> album Title: '+userAlbums[i].title+'</li>'+
              '</ul>'+
             '</div>'
           )
         }
       })
       .fail(function() {
         console.log( "error" );
       });
     }

      // -------------------------------------------- DRAG AND DROP FUNCTIONALITY

      document.addEventListener("dragstart", function(event) {
          console.log("dragstart");
          event.dataTransfer.setData("Text", event.target.id);
      });

       document.addEventListener("dragover", function(event) {
          console.log("dragover");
          event.preventDefault();
       });

       document.addEventListener("drag", function(event){
          event.dataTransfer.setData("text", event.target.id);
       });

       document.addEventListener("drop", function(event) {
          event.preventDefault();
          console.log("drop");
          console.log(event.target.className);

          if ( event.target.className == "user-table" ) {
              var data = event.dataTransfer.getData("Text");
              console.log(data);
              event.target.appendChild(document.getElementById(data));
          }
       });


});
