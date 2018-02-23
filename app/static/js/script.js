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
        content.router();
      }
    }
})();

  // method that starts the application
  app.init();
