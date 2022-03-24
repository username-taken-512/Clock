// Manage favourites

// Creates Fav object from timezonedetails page
function createFav() {
  let searchParams = getURLparams();
  let fav = {
    city: searchParams.get('city'),
    country: searchParams.get('country'),
    zoneName: searchParams.get('zonename')
  };

  saveFav(fav)
}

// Stores fav to local storage
function saveFav(fav) {
  let favs = getFavouritesFromStorage();
  console.log('- saveFav');

  // Check if already stored as favourite
  for (f of favs) {
    if (f.city === fav.city) {
      drawToast('⭐ Already A Favourite!');
      return false;
    }
  }

  favs.push(fav);
  saveFavouritesToStorage(favs);
  drawToast('⭐ Favourite Added!');
  return true;
}

// Draw favourites on favourites.html
function loadFavs() {
  let favs = getFavouritesFromStorage();

  // Clock HTML
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
  if (favs === undefined || favs.length == 0) {
    favSection.innerHTML = 'You have no favourites added 😔';
    return;
  }
  let content = '';

  favs.forEach(element => {

    content += `
      <article class="fav-card" data-zonename=${element.zoneName}>
        <span class="fav-clock-item flexbox-item">${clockDiv}</span>
        <span class="fav-info-container flexbox-item">
          <div class="fav-dig-clock-item dig-clock flexbox-item">00:00:00</div>
          <div class="fav-info-item flexbox-item">
              <strong class="bold">City: </strong>${element.city}</br>
              <strong class="bold">Country: </strong>${element.country}</br>
              <strong class="bold">Timezone: </strong>${element.zoneName} 
          </div>
          <div class="flexbox-item fav-button-item"><button class="button-fav" data-city="${element.city}" role="button" onclick="removeFav('${element.city}')">❌ Remove Favourite</button></div>
        </span>

      </article>
    `;
  });
  favSection.innerHTML = content;

  // Setup clocks
  console.log('setup clocks');
  let loadedFavs = document.querySelectorAll('.fav-card');
  loadedFavs.forEach(element => {
    let clockDiv = element.querySelector('.clock');
    let digClockDiv = element.querySelector('.dig-clock');
    startClock(clockDiv, digClockDiv, element.getAttribute('data-zonename'));
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
  drawToast('⭐ Favourite Removed!');
}

function saveFavouritesToStorage(favourites) {
  localStorage.setItem('clockFavourites', JSON.stringify(favourites));
}

function getFavouritesFromStorage() {
  return JSON.parse(localStorage.getItem('clockFavourites') || '[]');
}

// Draws a toast at the bottom of the window
function drawToast(text) {
  let toast = document.querySelector('.toast');

  // Add text and show div
  toast.classList.add('show');
  toast.innerHTML = text;

  // After 3 seconds, hide div again
  setTimeout(function () { toast.classList.remove('show'); }, 3000);
}

// Show/hide dialog to add custom timezone
async function showAddCustomTimezone() {
  document.querySelector('.form-popup-bgoverlay').style.visibility = 'visible';
  let selectTimezone = document.getElementById('custom-timezone');

  let rawData = await fetch('/data/list-time-zone.json');
  let jsonData = await rawData.json();
  let timezoneList = await jsonData.zones;

  for (let timezone of timezoneList) {
    console.log('---');
    console.log(timezone);
    let offsetHours = timezone.gmtOffset / 60 / 60;

    // Timezone GMT +/- to display
    if (offsetHours >= 0) {
      offsetHours = '+' + offsetHours;
    }
    selectTimezone.innerHTML += `<option value="${timezone.zoneName}">${timezone.zoneName} (GMT ${offsetHours})</option>`;
  }
}

function hideAddCustomTimezone() {
  document.querySelector('.form-popup-bgoverlay').style.visibility = 'hidden';
  document.querySelectorAll('.addcustom-error-message',).forEach(element => {
    element.style.visibility = 'hidden';
  });
}

// Add a custom timezone with FAB on Favourite page
function addCustomTimezone() {
  let city = document.getElementById('custom-city');
  let country = document.getElementById('custom-city');
  let timezone = document.getElementById('custom-timezone');

  // Input validation
  let inputError = false;
  document.querySelectorAll('.addcustom').forEach(element => {
    document.getElementById('error-' + element.id).style.visibility = 'hidden'; // Reset every attempt
    if (!element.checkValidity()) {
      document.getElementById('error-' + element.id).style.visibility = 'visible';  // Show error 
      inputError = true;
    }
  });
  if (inputError) {
    return;
  }

  let fav = {
    city: city.value.trim(),
    country: country.value.trim(),
    zoneName: timezone.value
  };

  // Save favourite and refresh list of favourites
  if (saveFav(fav)) {
    document.querySelectorAll('.addcustom').forEach(element => {
      element.value = '';
    });

    document.querySelector('.form-popup-bgoverlay').style.visibility = 'hidden';
    loadFavs();
  }
}
