// Draws information on timezonedetails page
function drawDetails(params) {
  let city = params.get('city');
  let offsetSeconds = params.get('offset');
  let offsetHours = offsetSeconds / 60 / 60;

  // Timezone GMT +/- to display
  if (offsetHours >= 0) {
    offsetHours = '+' + offsetHours;
  }

  document.querySelector('h1').innerHTML = params.get('country');
  document.querySelector('h2').innerHTML = city + ' (GMT ' + offsetHours + ')';

  displayImages(city);        // unsplash.js
  startClock(offsetSeconds);  // clock.js
}