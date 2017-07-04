import _ from 'lodash';

// By day of week
export function getByDayOfWeek(items) {
  const obj = items.reduce((memo, item) => {
    const weekDay = new Date(item.time).getDay();
    return getSmth(memo, item, weekDay);
  }, {});

  return getAsSortedArray(obj);
}

// by hour of day
export function getByHoursOfDay(items) {
  const obj = items.reduce((memo, item) => {
    const hour = new Date(item.time).getHours();
    return getSmth(memo, item, hour);
  }, {});

  return getAsSortedArray(obj);
}

export function getByDayOfMonth(items) {
  const obj = items.reduce((memo, item) => {
    const day = new Date(item.time).getDate();
    return getSmth(memo, item, day);
  }, {});

  return getAsSortedArray(obj);
}

// by hour of week
export function getByHourOfWeek(items) {
  const obj = items.reduce((memo, item) => {
    const weekDay = new Date(item.time).getDay();
    const hour = new Date(item.time).getHours();
    const key = parseInt(`${weekDay}${_.padStart(hour, 2, '0')}`, 10);
    const label = `${getWeekdayLabel(weekDay)}, kl. ${hour}`;

    return getSmth(memo, item, key, label);
  }, {});

  return getAsSortedArray(obj);
}

function getWeekdayLabel(i) {
  return [
    'søndag',
    'mandag',
    'tirsdag',
    'onsdag',
    'torsdag',
    'fredag',
    'lørdag'
  ][i];
}

function sortByKey(a, b) {
  return a.key - b.key;
}

function getAsSortedArray(obj) {
  return Object.values(obj).sort(sortByKey);
}

function getSmth(memo, item, key, label) {
  if (!memo[key]) {
    memo[key] = {
      key,
      label,
      washers: 0,
      washersAvg: 0,
      dryers: 0,
      dryersAvg: 0,
      showers: 0,
      showersAvg: 0,
      items: 0
    };
  }

  memo[key].washers += item.washers.available;
  memo[key].dryers += item.dryers.available;
  memo[key].showers += item.showers.available;
  memo[key].items += 1;

  memo[key].washersAvg = round(memo[key].washers / memo[key].items);
  memo[key].dryersAvg = round(memo[key].dryers / memo[key].items);
  memo[key].showersAvg = round(memo[key].showers / memo[key].items);

  return memo;
}

function round(num) {
  return Math.round(num * 10) / 10;
}
