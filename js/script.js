"use strict";
// Note I chose to use the keyword 'var' instead of ES6 'let' because var is better suported in all broswers

// Get users with id 1 and 2 from the mock-API. Also GET ALBUMS associated with these two USERS.
const api = "https://jsonplaceholder.typicode.com"
const albums = api+"/albums";
const user = api+"/users?id=";
var id;

// Make sure document has completely loaded before running code
$(document).ready(function(){
    getAlbums();



    // ---------------------------------- GET DATA

    function getAlbums(){
      var user1Albums=[];
      var user2Albums=[];
      //  Get request 1
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
      getUpdateUser(user, 1, user1Albums);
      getUpdateUser(user, 2, user2Albums);
    }




    // Get single user getAlbumslbums
    function getUpdateUser(user,id, userAlbums) {
      var albumId;
      var userId;
      var title;
      var counter =1;

      // The data will return only when all the object values are returned for each promise.
      // Get request 2
       $.get( user+id, function(data) {
       })
       .done(function(albumObj) {
         var name = '<div class="user-name">user name: '+albumObj[0].name+'</div>';
         $(`.user-table-${id}`).append(name);
         for(var i=0; i < userAlbums.length; i++, counter++){

           if(id===1){
             $('.user-table-1').append(
                 `<ul id="album-row-${userAlbums[i].id}"` + " "+  'draggable="true">'+
                   '<li class=" id-column"> album Id: '+userAlbums[i].id+'</li>'+
                  ' <li class="title-column"> album Title: '+userAlbums[i].title+'</li>'+
                '</ul>'
             )
           }
           if(id===2){
             $('.user-table-2').append(
                 `<ul id="album-row-${userAlbums[i].id}"` + " "+  'draggable="true">'+
                   '<li class="id-column"> album Id: '+userAlbums[i].id+'</li>'+
                  ' <li class="title-column"> album Title: '+userAlbums[i].title+'</li>'+
                '</ul>'
             )
           }
           //  If row is even then make background of row candy striped
           if (counter % 2 === 0) {
             $(`#album-row-${userAlbums[i].id}`).addClass("candy-striped");
           }
           //  If row is odd then make background of row candy striped
           if (counter % 2 !== 0) {
             $(`#album-row-${userAlbums[i].id}`).addClass("red");
           }
         }
       })
       .fail(function() {
         console.log( "error" );
       });

       // -------------------------------------------- DRAG AND DROP FUNCTIONALITY

       //  Start dragging row
       document.addEventListener("dragstart", function(event) {
           event.dataTransfer.setData("Text", event.target.id);
       });

        //  Dragover row
        document.addEventListener("dragover", function(event) {
           event.preventDefault();
        });

        //  Drag row
        document.addEventListener("drag", function(event){
           event.dataTransfer.setData("text", event.target.id);
           albumId = event.target.id.slice(10,12);
           title = event.target.children[1].innerHTML;
        });

        //  Drop row in table
        document.addEventListener("drop", function(event) {
           event.preventDefault();
           var dropContainer = $(event.target);
           if ( event.target.className == `user-table-${id}` ) {
             userId  = event.target.className.slice(11,12);
             var albumToTransfer = event.dataTransfer.getData("text");

             //  Ajax Update
             // Update the user id of the album
             $.ajax({
                 type: "PUT",
                 url: albums+"/"+albumId,
                 data: {
                   userId: userId,
                   id: albumId,
                   title: title
                   }
              })
              .done(function(album ) {
                   // After request resolves the album from the original user table will be removed
                   $(document.getElementById(albumToTransfer)).remove();
                   // After request resolves the album data returned from the promise will be appended to the new user's table
                   dropContainer.append(
                     `<ul id="album-row-${album.id}" `+  'draggable="true">'+
                       '<li class="id-column"> album Id: '+ album.id+'</li>'+
                      ' <li class="title-column"> album Title: '+album.title+'</li>'+
                    '</ul>'
                   );
              });
            }
        });
     }


});
