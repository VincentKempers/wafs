/**
 * (function(){})(); IIFE - An object oriented single page application that shows the different pages on click.
 * @return {app.init} - This will initialise the app on the page.
 */

(function(){
  'use strict';
  let app = {
    init: function(){
      routie('gifs');
      requestAPI.activeSearch();
      requestAPI.onReady();
    },
    collection: {}
  }

  /**
   * empty object to store the API call in.
   */
  // let
  /**
   * toggling sections on show and hidden.
   * {Object} sections
   * {method} sections.toggle
   * {method} sections.hideElements
   * {method} sections.showElement
   */
  const content = {
   /**
    * Disable all sections, enable the one with the ID passed
    * @memberof content
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
   },
   makeFavourite: function(gif) {
     let save = document.getElementById('save');
     save.addEventListener('click', function(event){
       let storeGifs = JSON.parse(localStorage.getItem('favourites')) || [];
       app.collection.forEach(function(d){
         if (d.id === gif) {
           storeGifs.push(d);
         }
       })
       let favGifs = JSON.stringify(storeGifs);
       localStorage.setItem("favourites", favGifs);
     }, true);
   }
 }

// make an object out of the ajax request

  const requestAPI = {
    xhr: new XMLHttpRequest(),
    api_key: "zjDU1C1AosZ5mth08HpZrvp1FAKqoh34",
    activeSearch: function() {
      let searchEl = document.getElementById('search');
      searchEl.addEventListener("keyup", function(event){
        requestAPI.onReady();
        requestAPI.xhr.open("GET",`https://api.giphy.com/v1/gifs/search?q=${searchEl.value}&api_key=${requestAPI.api_key}&limit=18&rating=pg`, true);
        requestAPI.xhr.send();
      });
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
            let giphy = JSON.parse(this.responseText);
              /**
               * collection - map collection or reduce the content that you recieve
               */
              app.collection = giphy.data.map(function(d){
                 return  {
                 id: d.id,
                 slug: d.slug,
                 title: d.title,
                 username: d.username,
                 originalIMG: d.images.original.url,
                 fixedIMG: d.images.fixed_width.url,
                 dateTime:d.import_datetime,
                 source: d.source
                }
               });
              renderContent.renderHTML();
          } else {
            renderContent.renderError();
          }
        }
      }
    }
  }

  const renderContent = {
    renderHTML: function() {
      let html = "<ul>";
      app.collection.forEach(function(d){
        html += `
                 <li>
                   <a href="#gifs/${d.id}"><img src="${d.fixedIMG}" alt=""></a>
                   <h2>${d.title}</h2>
                   <section>
                     <p>${d.username}</p>
                     <time>${d.dateTime}</time>
                     </section>
                 </li>`;
               });
        html += "</ul>";
      document.getElementById("gif-result").innerHTML = html;
    },
    renderSlugHTML: function(gif){
      function filterByID(item) {
        if (item.id == gif) {
          let html = "<section id='detailed-overlay'>"
          html += `
          <div>
            <a href="#gifs"><img src="static/imgs/cross.svg" alt="go back"></a>
            <img src="${item.originalIMG}" alt=""></a>
            <h2>${item.title}</h2>
            <img id="save" src="static/imgs/star.svg" alt="save to favourites">
            <section>
              <p>${item.username}</p>
              <time>${item.dateTime}</time>
              <a href=${item.source}><button>Go to source</button></a>
              </section>
          </div>
          `;
          html += "</section>";
          document.getElementById("detail-gif").insertAdjacentHTML('afterbegin', html);
          content.makeFavourite(gif);
        }
      }
      app.collection.filter(filterByID);
    },
    getFavourites: function() {
      let getItems = JSON.parse(localStorage.getItem("favourites"));
      if ( getItems === null ) {
        let html = "<div id='empty'>";
          html += `
          <h2>It's empty here</h2>
            <img src="static/imgs/source.gif" alt="">
          `;
        html += "</div>";
        document.getElementById("yourFavs").innerHTML = html;
      } else {
        let html = "<ul>";
        getItems.forEach(function(d){
          html += `
          <li>
            <a href="#favourites/${d.id}"><img src="${d.fixedIMG}" alt=""></a>
            <h2>${d.title}</h2>
          </li>
          `
        });
        html += "</ul>";
        document.getElementById("yourFavs").innerHTML = html;
      }
    },
    renderFavSlug: function(gif){
      let getItems = JSON.parse(localStorage.getItem("favourites"));
      getItems.forEach(function(d) {
        if (d.id === gif) {
          let html = "<section id='detailed-overlay'>"
          html += `
          <div>
            <a href="#favourites"><img src="static/imgs/cross.svg" alt="go back"></a>
            <img src="${d.originalIMG}" alt=""></a>
            <h2>${d.title}</h2>
            <section>
              <p>${d.username}</p>
              <time>${d.dateTime}</time>
              <a href=${d.source}><button>Go to source</button></a>
              </section>
          </div>
          `;
          html += "</section>";
          document.getElementById("detail-fav").insertAdjacentHTML('afterbegin', html);
        }
      });
    },
    renderError: function() {
      let errorHTML = `
      <h2>Something went wrong...</h2>
      <img src="static/imgs/error.gif" alt="something went wrong im broken gif">
      `;
      document.getElementById("gif-result").innerHTML = errorHTML;
    }
  }

// handles the routes
  routie({
      'gifs': function() {
        requestAPI.onReady();
        content.toggle(window.location.hash);
      },
      'gifs/:gif': function(gif) {
        renderContent.renderSlugHTML(gif);
      },
      'favourites': function() {
        renderContent.getFavourites();
        content.toggle(window.location.hash);

      },'favourites/:gif':function(gif){
        // renderContent.getFavourites();
        renderContent.renderFavSlug(gif);
      },
      'trending': function() {
        content.toggle(window.location.hash);
      }
  });

  // method that starts the application
  app.init();
})();
