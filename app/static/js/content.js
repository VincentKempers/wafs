/**
 * toggling sections on show and hidden.
 * {Object} sections
 * {method} sections.toggle
 * {method} sections.hideElements
 * {method} sections.showElement
 */

let content = (function() {
  /**
   * Hide the elements by applying the hidden class.
   * @param {String} selector The CSS Selector of the elements to hide
   */
  function hideElements(selector) {
    document.querySelectorAll(selector).forEach(function(element) {
      element.classList.add('hidden');
    });
  }
    /**
     * Show the element by removing the hidden class
     * @param {String} selector The CSS Selector of the element to show
     */
  function showElement(selector) {
      document.querySelector(selector).classList.remove('hidden');
  };

  // empty variable to store the page data of every search
  var collection = {};

  return {
   /**
    * Disable all sections, enable the one with the ID passed
    * @memberof content
    * @param {String} id The ID of the element to enable
    */
   toggle: function(id) {
     hideElements('section');
     showElement(id);
   },
   router: function(){
     routie({
           'gifs': function() {
             content.toggle(window.location.hash);
           },
           'gifs/:gif': function(gif) {
             renderContent.renderSlugHTML(gif);
           },
           'favourites': function() {
             renderContent.renderFavourites();
             content.toggle(window.location.hash);

           },'favourites/:gif':function(gif){
             renderContent.renderFavSlug(gif);
           }
       });
   },
   collection: collection,
   makeFavourite: function(gif) {
     let save = document.getElementById('save');
     save.addEventListener('click', function(event){
       let storeGifs = JSON.parse(localStorage.getItem('favourites')) || [];
       save.classList.add("fill");
       content.collection.forEach(function(d){
         if (d.id === gif) {
           storeGifs.push(d);
         }
       })
       let favGifs = JSON.stringify(storeGifs);
       localStorage.setItem("favourites", favGifs);
     }, true);
   }

  }
})();
