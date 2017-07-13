import _ from 'lodash';

function isWeekend(date) {
  const day = new Date(date).getDay();
  return day === 6 || day === 0;
}

// By day of week
export function getByDayOfWeek(items, type) {
  return getChartData(items, type, item => {
    const weekday = new Date(item.time).getDay();
    const key = getWeekdayLocalized(weekday);
    const label = getWeekdayLabelLong(key);
    return { key, label };
  });
}

function filterByWeekend(items, filter) {
  switch (filter) {
    case 'weekend':
      return items.filter(item => isWeekend(item.time));
    case 'weekday':
      return items.filter(item => !isWeekend(item.time));
    default:
      return items;
  }
}

// by hour of day
export function getByHoursOfDay(items, type, filter) {
  const filteredItems = filterByWeekend(items, filter);
  return getChartData(filteredItems, type, item => {
    const key = new Date(item.time).getHours();
    const label = `kl. ${key}`;
    return { key, label };
  });
}

export function getByDayOfMonth(items, type) {
  return getChartData(items, type, item => {
    const key = new Date(item.time).getDate();
    const label = key;
    return { key, label };
  });
}

function getWeekdayLocalized(weekday) {
  return weekday === 0 ? 7 : weekday;
}

// by hour of week
export function getByHourOfWeek(items, type) {
  return getChartData(items, type, item => {
    const weekday = new Date(item.time).getDay();
    const weekdayLocalized = getWeekdayLocalized(weekday);
    const hour = new Date(item.time).getHours();
    const key = parseInt(`${weekdayLocalized}${_.padStart(hour, 2, '0')}`, 10);
    const label = `${getWeekdayLabelShort(weekday)}, kl. ${hour}`;
    return { key, label };
  });
}

function getWeekdayLabelLong(i) {
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

function getWeekdayLabelShort(i) {
  return ['søn', 'man', 'tirs', 'ons', 'tors', 'fre', 'lør'][i];
}

function getChartData(items, type, iteratee) {
  const chartData = items.reduce((state, item) => {
    const { key, label } = iteratee(item);

    return {
      ...state,
      [key]: {
        ...state[key],
        key,
        label,
        sum: _.get(state, `[${key}].sum`, 0) + item[type].available,
        occurrences: _.get(state, `[${key}].occurrences`, 0) + 1
      }
    };
  }, {});

  return Object.values(chartData)
    .sort((a, b) => a.key - b.key)
    .map(getAverages);
}

function getAverages(item) {
  return {
    ...item,
    avg: round(item.sum / item.occurrences)
  };
}

function round(num) {
  return Math.round(num * 10) / 10;
}
