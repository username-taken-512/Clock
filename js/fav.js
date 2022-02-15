// Manage favourites

function saveFav() {
  let favs = getFavouritesFromStorage();
  console.log('- saveFav');

  // Get params, store in object
  let searchParams = getURLparams();
  let fav = {
    city: searchParams.get('city'),
    country: searchParams.get('country'),
    offset: searchParams.get('offset')
  };

  console.log(fav.city);
  console.log(fav.country);
  console.log(fav.offset);

  favs.push(fav);
  saveFavouritesToStorage(favs);
}

// Draw favourites on favourites.html
function loadFavs() {
  let favs = getFavouritesFromStorage();
  const clockDiv = `  
  <div class="clock fav-clock">
    <div class="outer-clock-face">
      <div class="marking marking-one"></div>
      <div class="marking marking-two"></div>
      <div class="marking marking-three"></div>
      <div class="marking marking-four"></div>
      <div class="inner-clock-face">
        <div class="hand hour-hand"></div>
        <div class="hand min-hand"></div>
        <div class="hand second-hand"></div>
      </div>
    </div>
  </div>`;

  // Draw html
  let favSection = document.querySelector('.favourites');
  let content = '';

  favs.forEach(element => {
    content += `
      <article class="fav" data-offset="${element.offset}">
        <div class="favClock">${clockDiv}</div>
        <span class="favInfo">
          <h3>${element.city}<h3>
          <h4>${element.country}<h4>
        </span>
        <button class="button-fav button-remove" data-city="${element.city}" role="button" onclick="removeFav('${element.city}')">❌ Remove Favourite</button>
      </article>
    `;
  });
  favSection.innerHTML = content;

  // Setup clocks
  console.log('setup clocks');
  let loadedFavs = document.querySelectorAll('.fav');
  loadedFavs.forEach(element => {
    element.getAttribute('data-offset');
    let clockDiv = element.querySelector('.clock');
    startClock(clockDiv, element.getAttribute('data-offset'));
  });
}

// Remove a city from Favourite list
function removeFav(city) {
  let favs = getFavouritesFromStorage();
  let index;

  console.log('- removeFav: ' + city);
  favs.forEach(element => {
    if (element.city === city) {
      index = favs.indexOf(element);
      favs.splice(index, 1);
      console.log('removeFav removed: ' + element);
    }
  });

  // Save changes and reload favourites
  saveFavouritesToStorage(favs);
  loadFavs();
}

function saveFavouritesToStorage(favourites) {
  localStorage.setItem('clockFavourites', JSON.stringify(favourites));
}

function getFavouritesFromStorage() {
  return JSON.parse(localStorage.getItem('clockFavourites') || '[]');
}