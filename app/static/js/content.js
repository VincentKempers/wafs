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
