let currentClocks = []; // Stores interval id for running clocks
const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

// Starts clock. Receives div with clock and timezone offset
function startClock(clockElement, digClockElement, zoneName) {

  let intervalId = setInterval(function () {
    setDate(clockElement, digClockElement, zoneName);
  }, 1000);
  currentClocks.push(intervalId);

  // TEST to remove clock
  window.onbeforeunload = function (event) {
    clearInterval(intervalId);
  };
}

// Updates clock
function setDate(clockElement, digClockElement, zoneName) {
  let secondHand = clockElement.querySelector('.second-hand');
  let minsHand = clockElement.querySelector('.min-hand');
  let hourHand = clockElement.querySelector('.hour-hand');

  // Update analog clock
  let d = new Date().toLocaleString("sv-SE", { timeZone: zoneName });

  let currentTime = new Date(  //new Date(year, monthIndex, day, hours, minutes, seconds)
    d.substring(0, 4), d.substring(5, 7) - 1, d.substring(8, 10),
    d.substring(11, 13), d.substring(14, 16), d.substring(17, 19)
  );

  const seconds = currentTime.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = currentTime.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = currentTime.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;

  // Update digital clock
  digClockElement.innerHTML = `${hour}:${mins > 9 ? mins : '0' + mins}:${seconds > 9 ? seconds : '0' + seconds} ${weekdays[currentTime.getDay()]}`
}

// Stops all clock intervals
function stopClocks() {
  if (currentClocks.length > 0) {
    currentClocks.forEach(element => {
      clearInterval(element);
    });
  }
}

