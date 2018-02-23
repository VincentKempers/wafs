/**
 * (function(){})(); IIFE - An object oriented single page application that shows the different pages on click.
 * @return {app.init} - This will initialise the app on the page.
 */

  let app = (function() {

    return {
      init: function(){
        requestAPI.onReady();
        requestAPI.activeSearch();
        content.router();
      }
    }
})();

  // method that starts the application
  app.init();
