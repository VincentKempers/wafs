/**
 * (function(){})(); IIFE - An object oriented single page application that shows the different pages on click.
 * @return {app.init} - This will initialise the app on the page.
 */

(function(){
  'use strict';
  const app = {
    init: function(){

      requestAPI.xhr.open("GET", `http://api.giphy.com/v1/gifs/search?q=${requestAPI.search}&api_key=${requestAPI.api_key}&limit=10`, true);
      requestAPI.xhr.send();
      routie('gifs');
    }
  };

  let collection = {};

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
     console.log(selector);
     document.querySelector(selector).classList.remove('hidden');
   }
 };

// make an object out of the ajax request

  const requestAPI = {
    xhr: new XMLHttpRequest(),
    api_key: "zjDU1C1AosZ5mth08HpZrvp1FAKqoh34",
    search: "Finn",
    activeSearch: function() {
      this.search.addEventListener("keyup", function(event){
        this.key =+ requestAPI.search;
      })
    },
    onReady: function() {
      this.xhr.onreadystatechange = function () {
      /**
       * if - the connection type is 4 (Done) we check if there is a positive status.
       * * @param  {if} this.readyState === 4.
       * > if there is a positive retrieval (200) we will show the raw JSON in a section.
       * * @param {if} this.status === 200.
       * html - make an html tag that generates the list items. using string literals ``
       *
       */
        if (this.readyState === 4) {
          if (this.status === 200) {
            let html = "<ul>";
            let giphy = JSON.parse(this.responseText);
              collection = giphy.data
              collection.forEach(function(d){
                html += `
                <li>
                  <a href="#gifs/#${d.slug}"><img src="${d.images.original.url}" alt=""></a>
                  <h2>${d.title}</h2>
                  <section>
                    <p>${d.username}</p>
                    <time>${d.import_datetime}</time>
                    </section>
                </li>`
              })
            html += "</ul>";
            document.getElementById("gif-result").innerHTML = html;
          } else {
            console.log(`error: ${this.status}`);
          }
        }
      }
    },
    renderHTML: function(gif){
      for (let i=0; i < collection.length; i++){
        if (`#${collection[i].slug}` === gif) {
          let html = "<section id='detailed-overlay'>"
          html += `<div>
            <img src="" alt=""></a>
            <img src="${collection[i].images.original.url}" alt=""></a>
            <h2>${collection[i].title}</h2>
            <section>
              <p>${collection[i].username}</p>
              <time>${collection[i].import_datetime}</time>
              </section>
          </div>
          `;
          html += "</section>"
          document.getElementById("explain").innerHTML = html;
        } else {
          console.log('nothing');
        }
      }
    }
  }

  routie({
      'gifs': function() {
        requestAPI.onReady();
        sections.toggle(window.location.hash);
      },
      'gifs/:gif': function(gif) {
        requestAPI.renderHTML(gif);
      },
      'begin': function() {
        sections.toggle(window.location.hash);
      },
      'best-practices': function() {
        sections.toggle(window.location.hash);
      }
  });

  // method that starts the application
  app.init();
})();
