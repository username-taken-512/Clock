let currentClocks = []; // Stores interval id for running clocks
const weekdays = ['sun', 'mon', 'tue', 'wen', 'thu', 'fri', 'sat'];

// Starts clock. Receives div with clock and timezone offset
function startClock(clockElement, digClockElement, offsetSeconds) {

  console.log('startclock offset: ' + offsetSeconds);
  let offsetMillis = offsetSeconds * 1000;
  let intervalId = setInterval(function () {
    setDate(clockElement, digClockElement, offsetMillis);
  }, 1000);
  currentClocks.push(intervalId);

  // TEST to remove clock
  window.onbeforeunload = function (event) {
    console.log('startclock onBeforeunload');
    clearInterval(intervalId);
  };
}

// Updates clock
function setDate(clockElement, digClockElement, offsetMillis) {
  let secondHand = clockElement.querySelector('.second-hand');
  let minsHand = clockElement.querySelector('.min-hand');
  let hourHand = clockElement.querySelector('.hour-hand');

  console.log('setDate');
  // Update analog clock
  const currentTimeGMT = new Date();
  const currentTime = new Date(currentTimeGMT.getTime() + offsetMillis);

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
  console.log('-clock ' + currentTime.getDay());
}

// Stops all clock intervals
function stopClocks() {
  if (currentClocks.length > 0) {
    currentClocks.forEach(element => {
      console.log('- stop clock: ' + element);
      clearInterval(element);
    });
  }
}

