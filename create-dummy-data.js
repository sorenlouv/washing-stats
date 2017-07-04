function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).getTime();
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function odds50() {
  return Math.random() >= 0.5;
}

const items = Array(1000).fill().map(() => {
  return {
    time: randomDate(new Date(2017, 5, 7), new Date()),
    showers: { available: getRandomNumber(3), total: 3 },
    washers: { available: getRandomNumber(6), total: 6 },
    dryers: { available: odds50() ? getRandomNumber(3) : 0, total: 3 }
  };
});
