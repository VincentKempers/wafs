/**
 * (function(){})(); IIFE - An object oriented single page application that shows the different pages on click.
 * @return {app.init} - This will initialise the app on the page.
 */

  let app = (function() {
    // empty variable to store the page data of every search
    var collection = {};



    return {
      init: function(){
        requestAPI.activeSearch();
        requestAPI.onReady();
        routie('gifs');
      }
    }
})();

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
        renderContent.renderFavSlug(gif);
      }
  });
  // method that starts the application
  app.init();
