/**
 * (function(){})(); IIFE - An object oriented single page application that shows the different pages on click.
 * @return {app.init} - This will initialise the app on the page.
 */

  let app = (function() {

    var collection = {};

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

    return {
      init: function(){
        routie('gifs');
        requestAPI.activeSearch();
        requestAPI.onReady();
      }
    }


})();
  // method that starts the application
  app.init();
