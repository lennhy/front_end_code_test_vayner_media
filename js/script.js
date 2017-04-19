"use strict";
// Note I chose to use the keyword 'var' instead of ES6 'let' because var is better suported in all broswers

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
        console.log( "error" );
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
             '<div class="user-table" ondrop="drop(event)" ondragover="allowDrop(event)">'+
               `<ul id="album-row-${userAlbums[i].id}"` + " "+  'draggable="true">'+
                 '<li class="id-column"> album Id: '+userAlbums[i].id+'</li>'+
                ' <li class="title-column"> album Title: '+userAlbums[i].title+'</li>'+
              '</ul>'+
             '</div>'
           )
           eventStart(`#album-row-${userAlbums[i].id}`);

         }
       })
       .fail(function() {
         console.log( "error" );
       });
     }

      // Drag and drop functionality
    //  function allowDrop(ev) {
    //     ev.preventDefault();
    //  }
    function eventStart(divId){
      console.log(divId);
      var row = document.querySelector(divId);
      row.addEventListener("drag", function(){
        console.log("yoo");
      });
    }
     function drag(ev) {
       console.log(ev.target.id);
        ev.dataTransfer.setData("text", ev.target.id);

     }

     function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        console.log(data);
        ev.target.appendChild(document.getElementById(data));
     }

});
