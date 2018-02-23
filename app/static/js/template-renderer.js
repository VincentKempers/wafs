const renderContent = (function(){

  return {
    renderHTML: function() {
      let html = "<ul>";
      content.collection.forEach(function(d){
        html += `
                 <li>
                   <a href="#gifs/${d.id}"><img src="${d.fixedIMG}" alt="${d.title}"></a>
                   <h3>${d.title}</h3>
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
        if (item.id === gif) {
          let html = "<section id='detailed-overlay'>"
          html += `
          <div>
            <a href="#gifs"><img src="static/imgs/cross.svg" alt="go back"></a>
            <img src="${item.originalIMG}" alt=""></a>
            <h3>${item.title}</h3>
            <svg id="save" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>

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
      content.collection.filter(filterByID);
    },
    renderFavourites: function() {
      let getItems = JSON.parse(localStorage.getItem("favourites"));
      if ( getItems === null ) {
        let html = "<div id='empty'>";
          html += `
          <h2>It's empty here!</h2>
            <img src="static/imgs/source.gif" alt="">
            <p>Go get some awesome gifs here!</p>
          `;
        html += "</div>";
        document.getElementById("yourFavs").innerHTML = html;
      } else {
        let html = `<ul>`;
        getItems.forEach(function(d){
          html += `
          <li>
            <a href="#favourites/${d.id}"><img src="${d.fixedIMG}" alt="${d.title}"></a>
            <h3>${d.title}</h3>
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
            <h3>${d.title}</h3>
            <section>
              <p>${d.username}</p>
              <time>${d.dateTime}</time>
              <a href=${d.originalIMG}><button>go to hosted picture</button></a>
              </section>
          </div>
          `;
          html += "</section>";
          document.getElementById("detail-fav").innerHTML = html;
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
