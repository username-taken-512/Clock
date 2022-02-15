// Draws information on timezonedetails page
function drawDetails(params) {
  let city = params.get('city');
  let offsetSeconds = params.get('offset');
  let offsetHours = offsetSeconds / 60 / 60;

  // Timezone GMT +/- to display
  if (offsetHours >= 0) {
    offsetHours = '+' + offsetHours;
  }

  document.querySelector('h2').innerHTML = params.get('country');
  document.querySelector('h1').innerHTML = city + ' (GMT ' + offsetHours + ')';
  let clock = document.querySelector('.clock');

  displayImages(city);        // unsplash.js
  startClock(clock, offsetSeconds);  // clock.js
}