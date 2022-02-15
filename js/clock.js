let currentClocks = []; // Stores interval id for running clocks

// Starts clock. Receives div with clock and timezone offset
function startClock(clockElement, offsetSeconds) {

  console.log('startclock offset: ' + offsetSeconds);
  let offsetMillis = offsetSeconds * 1000;
  let intervalId = setInterval(function () {
    setDate(clockElement, offsetMillis);
  }, 1000);
  currentClocks.push(intervalId);

  // TEST to remove clock
  window.onbeforeunload = function (event) {
    console.log('startclock onBeforeunload');
    clearInterval(intervalId);
  };
}

// Updates clock
function setDate(clockElement, offsetMillis) {
  let secondHand = clockElement.querySelector('.second-hand');
  let minsHand = clockElement.querySelector('.min-hand');
  let hourHand = clockElement.querySelector('.hour-hand');

  console.log('setDate');
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

