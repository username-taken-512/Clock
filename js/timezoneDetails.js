// Draws information on timezonedetails page
async function drawDetails(params) {
  let city = params.get('city');
  let country = params.get('country');
  let offsetSeconds = params.get('offset');
  let offsetHours = offsetSeconds / 60 / 60;
  let zoneName = params.get('zonename');

  // Timezone GMT +/- to display
  if (offsetHours >= 0) {
    offsetHours = '+' + offsetHours;
  }

  document.querySelector('.country').innerHTML = country;
  document.querySelector('.city').innerHTML = city + ' (GMT ' + offsetHours + ')';
  let clock = document.querySelector('.clock');
  let digClock = document.querySelector('.dig-clock');
  let bottomInfo = document.querySelector('.timezonedetails-bottom-container');

  let imageElement = document.querySelector('.timezonedetails-image');

  displayImages(imageElement, city, country);        // unsplash.js
  startClock(clock, digClock, zoneName);  // clock.js
  bottomInfo.innerHTML = await getWikiInfo(city); // Gets wiki info
}

// Queries Wikipedia and returns extract of article
async function getWikiInfo(title) {
  const URL = 'https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&redirects=1&titles=' + title;
  let response = await fetch(URL);
  let jsonInfo = await response.json();
  let article = jsonInfo.query.pages[Object.keys(jsonInfo.query.pages)[0]].extract;
  console.log('--- WIKI ---');
  console.log(jsonInfo);

  // If ambigious search, return link instead
  if (article.substring(0, 100).includes('may refer to')) {
    return `<p>Could not fetch article from <a href="https://en.wikipedia.org/wiki/${title}" target="_blank">https://en.wikipedia.org/wiki/${title}</a></p>`
  } else {
    return jsonInfo.query.pages[Object.keys(jsonInfo.query.pages)[0]].extract;
  }
}

