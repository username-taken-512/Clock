// Lists timezones on timezones.html

function setupTimezonePage() {
  console.log('Setting up timezone page');

  loadJsonDisplayTimezones();

  // Search form listener
  let form = document.getElementById('searchform');
  form.addEventListener('submit', event => {
    console.log('Saving value', form.elements.q.value);
    event.preventDefault();
    search(form.elements.q.value.toLowerCase());
  });
}

// Search timezone list on timezones.html and filter what to show
function search(searchString) {
  console.log('Search: ' + searchString);
  let timezoneSection = document.getElementById('timezones');
  const timezoneSectionChildren = timezoneSection.children;
  const childrenArray = Array.from(timezoneSectionChildren);
  childrenArray.forEach(element => {
    let city = element.querySelector('.city').innerText;
    let country = element.querySelector('.country').innerText;
    if (city.toLowerCase().includes(searchString.trim())) {
      element.style.display = 'block';
    } else if (country.toLowerCase().includes(searchString.trim())) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  });
}

// Import list of timezones (from https://timezonedb.com/api) and load on page
async function loadJsonDisplayTimezones() {
  let timezoneSection = document.getElementById('timezones');
  let rawData = await fetch('/data/list-time-zone.json');

  let jsonData = await rawData.json();
  let timezoneList = await jsonData.zones;

  console.log(jsonData.zones);
  let html = '';
  for (let timezone of timezoneList) {
    let cityNameSplit = timezone.zoneName.split('/');
    let city = cityNameSplit[cityNameSplit.length - 1].replaceAll('_', ' ');
    let offsetHours = timezone.gmtOffset / 60 / 60;
    let zoneName = timezone.zoneName;

    // Timezone GMT +/- to display
    if (offsetHours >= 0) {
      offsetHours = '+' + offsetHours;
    }

    // Create timezone article and append to section of timezones
    let article = document.createElement('article');
    article.classList.add('timezone');
    timezoneSection.appendChild(article);

    html += `
          <article class="timezone">
            <h3 class="country">
              <a href="/timezonedetails?country=${timezone.countryName}&city=${city}&offset=${timezone.gmtOffset}&zonename=${zoneName}" 
                data-city="${city}" data-country="${timezone.countryName}" data-offset="${timezone.gmtOffset / 60 / 60}"> 🌍 ${timezone.countryName}
              </a>
            </h3>
            <p class="city"> 🏙 ${city}</p>
            <p class="offset">🕒 Offset: GMT ${offsetHours}</p>
          </article>
        `;
  }
  // Grab an element from html
  document.querySelector('.timezones').innerHTML = html;
}
