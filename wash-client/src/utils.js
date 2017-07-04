import _ from 'lodash';

// By day of week
export function getByDayOfWeek(items) {
  return getChartData(items, item => {
    const key = new Date(item.time).getDay();
    const label = key;
    return { key, label };
  });
}

// by hour of day
export function getByHoursOfDay(items) {
  return getChartData(items, item => {
    const key = new Date(item.time).getHours();
    const label = key;
    return { key, label };
  });
}

export function getByDayOfMonth(items) {
  return getChartData(items, item => {
    const key = new Date(item.time).getDate();
    const label = key;
    return { key, label };
  });
}

// by hour of week
export function getByHourOfWeek(items) {
  return getChartData(items, item => {
    const weekDay = new Date(item.time).getDay();
    const hour = new Date(item.time).getHours();
    const key = parseInt(`${weekDay}${_.padStart(hour, 2, '0')}`, 10);
    const label = `${getWeekdayLabel(weekDay)}, kl. ${hour}`;
    return { key, label };
  });
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

function getChartData(items, iteratee) {
  const chartData = items.reduce((state, item) => {
    const { key, label } = iteratee(item);

    return {
      ...state,
      [key]: {
        ...state[key],
        key,
        label,
        washers: _.get(state, `[${key}].washers`, 0) + item.washers.available,
        dryers: _.get(state, `[${key}].dryers`, 0) + item.dryers.available,
        showers: _.get(state, `[${key}].showers`, 0) + item.showers.available,
        occurrences: _.get(state, `[${key}].occurrences`, 0) + 1
      }
    };
  }, {});

  return Object.values(chartData).sort(sortByKey).map(getAverages);
}

function getAverages(item) {
  return {
    ...item,
    washersAvg: round(item.washers / item.occurrences),
    dryersAvg: round(item.dryers / item.occurrences),
    showersAvg: round(item.showers / item.occurrences)
  };
}

function sortByKey(a, b) {
  return a.key - b.key;
}

function round(num) {
  return Math.round(num * 10) / 10;
}
