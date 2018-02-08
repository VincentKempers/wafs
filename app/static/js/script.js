/*

  Javascript Init

*/
(function() {
  'use strict'

  const settings = {
      sections: document.querySelectorAll('section')
  }

  const app = {
    init() {
      routes.init()
    }
  }

  const routes = {
    init() {
      let route = window.location.hash;
      route !== '' ? sections.toggle(route) :  window.location.hash = '#start-scherm'

      window.addEventListener('hashchange', (event) => {
        route =  window.location.hash;
        sections.toggle(route)
      })
    }
  }

  const sections = {
    toggle(route) {
      //2 show active route

      settings.sections.forEach(function(el){
        '#' + el.id === route ? el.classList.add('active') : el.classList.remove('active')
      })
      console.log(route)
    }
  }

  app.init()
})()
