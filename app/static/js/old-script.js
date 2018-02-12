/**
 * (function(){})(); - An object oriented single page application that shows the different pages on click.
 * @return {app.init} - This will initialise the app on the page.
 */

(function(){
  'use strict';
  const app = {
    init: function(){
      router.init();
      // giphyRequest.init();
    }
  };



  const router = {
    /**
     * init - function that checks if the hash is empty if so it needs to show the #start page.
     * toggling should happen on every click
     */
    init: function(){
       if (window.location.hash === '') {
        window.location.hash = '#start';
      } else {
        sections.toggle(window.location.hash);
      }
      window.addEventListener('hashchange', function click(event) {
        sections.toggle(window.location.hash);
      });
    }
  };

  /**
   * toggling sections on show and hidden.
   * {Object} sections
   * {method} sections.toggle
   * {method} sections.hideElements
   * {method} sections.showElement
   */
  const sections = {
   /**
    * Disable all sections, enable the one with the ID passed
    * @memberof sections
    * @param {String} id The ID of the element to enable
    */
   toggle: function(id) {
     this.hideElements('section');
     this.showElement(id);
   },

   /**
    * Hide the elements by applying the hidden class.
    * @param {String} selector The CSS Selector of the elements to hide
    */
   hideElements: function(selector) {
     document.querySelectorAll(selector).forEach(function(element) {
       element.classList.add('hidden');
     });
   },

   /**
    * Show the element by removing the hidden class
    * @param {String} selector The CSS Selector of the element to show
    */
   showElement: function(selector) {
     document.querySelector(selector).classList.remove('hidden');
   }
 };

 // making a connection with giphy api and retrieve data from that API
 // link: "http://api.giphy.com/v1/gifs/search?q=ryan&api_key=zjDU1C1AosZ5mth08HpZrvp1FAKqoh34&limit=5"
 var xhr = new XMLHttpRequest;
 var api_key = "zjDU1C1AosZ5mth08HpZrvp1FAKqoh34";
 var search = "Morty";

 xhr.onreadystatechange = function() {
   /**
    * if - the connection type is 4 (Done) we check if there is a positive status.
    * * @param  {if} xhr.readyState === 4.
    * > if there is a positive retrieval (200) we will show the raw JSON in a section.
    * * @param {if} xhr.status === 200.
    */
   if (xhr.readyState === 4) {
     if (xhr.status === 200) {
       var html = "<ul>";
       var data = JSON.parse(xhr.responseText)

       console.log(data.data);

       data.data.forEach(function(d){
         console.log(d.images.original);
         html += `
         <li>
           <img src="${d.images.original.url}" alt="">
           <h2>${d.title}</h2>
           <section>
             <p>${d.username}</p>
             <time>${d.import_datetime}</time>
           </section>
         </li>
         `
       })
       html += '</ul>';
       document.getElementById("gif-result").innerHTML = html;

     } else {
       console.log(`error: ${xhr.status}`);
     }
   }
 }


xhr.open("GET", `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${api_key}&limit=10`, true);
xhr.send();
  // method that starts the application
  app.init();
})();
