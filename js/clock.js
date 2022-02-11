let secondHand;
let minsHand;
let hourHand;
let offsetMillis;

function startClock(offsetSeconds) {
  secondHand = document.querySelector('.second-hand');
  minsHand = document.querySelector('.min-hand');
  hourHand = document.querySelector('.hour-hand');

  console.log('startclock offset: ' + offsetSeconds);
  offsetMillis = offsetSeconds * 1000;
  let intervalId = setInterval(setDate, 1000);
  setDate();

  window.onbeforeunload = function (event) {
    console.log('startclock onBeforeunload');
    clearInterval(intervalId);
  };
}

function setDate() {
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

