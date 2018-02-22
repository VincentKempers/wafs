const renderContent = (function(){

  return {
    renderHTML: function() {
      let html = "<ul>";
      app.collection.forEach(function(d){
        html += `
                 <li>
                   <a href="#gifs/${d.id}"><img src="${d.fixedIMG}" alt="${d.title}"></a>
                   <h2>${d.title}</h2>
                   <section>
                     <p>${d.username}</p>
                    </section>
                 </li>
                 `;
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
          html += `</section>`;
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
        let html = `<ul>`;
        getItems.forEach(function(d){
          html += `
          <li>
            <a href="#favourites/${d.id}"><img src="${d.fixedIMG}" alt=""></a>
            <h2>${d.title}</h2>
          </li>
          `
        });
        html += `</ul>`;
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
      <div>
        <h2>Oh no!</h2>
        <p>Something went wrong... </p>
        <img src="static/imgs/error.gif" alt="something went wrong im broken gif">
        <p>We are fixing this as soon as we can.. </p>
      </div>
      `;
      document.getElementById("gif-result").innerHTML = errorHTML;
    }
  }
})();
