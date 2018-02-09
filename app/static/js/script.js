/**
 * (function(){})(); - An object oriented single page application that shows the different pages on click.
 * @return {app.init} - This will initialise the app on the page.
 */

(function(){
  'use strict';
  const app = {
    init: function(){
      router.init();
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

  // method that starts the application
  app.init();
})();
