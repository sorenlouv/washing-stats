import React, { Component } from 'react';
import { getUrlParam, QueryLink } from '../services/url';
import { getData } from '../services/rest';
import Chart from '../Chart/Chart';
import {
  getByHoursOfDay,
  getByDayOfWeek,
  getByHourOfWeek,
  getByDayOfMonth
} from './helpers';

import './App.css';

function getChartData(data, { type, filter, period, timeUnit }) {
  switch (period) {
    case 'day':
      return getByHoursOfDay(data, type, filter);
    case 'week':
      switch (timeUnit) {
        case 'day':
          return getByDayOfWeek(data, type);
        case 'hour':
          return getByHourOfWeek(data, type);
      }
    case 'month':
      return getByDayOfMonth(data, type);
  }
}

function getLabelX({ period, timeUnit }) {
  switch (period) {
    case 'day':
      return 'Klokkeslæt';
    case 'week':
      switch (timeUnit) {
        case 'day':
          return 'Ugedag';
        case 'hour':
          return 'Ugedag og klokkeslæt';
      }
    case 'month':
      return 'Dag i måneden';
  }
}

function getTitle(period) {
  switch (period) {
    case 'day':
      return 'Daglig forbrug';
    case 'week':
      return 'Ugentlig forbrug';
    case 'month':
      return 'Månedlig forbrug';
    default:
      return 'Forbrug';
  }
}

function getChartDomain(type) {
  switch (type) {
    case 'washers':
      return [0, 6];
    case 'dryers':
    case 'showers':
      return [0, 3];
    default:
      return [0, 6];
  }
}

function getChartName(type) {
  switch (type) {
    case 'washers':
      return 'vaskemaskine';
    case 'dryers':
      return 'Tørretumbler';
    case 'showers':
      return 'Brusebad';
    default:
      return [0, 6];
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      weekendFilter: 'all'
    };
  }

  componentDidMount() {
    getData().then(res => {
      this.setState({ data: res.data.Items });
    });
  }

  render() {
    const { search } = this.props.location;
    const type = getUrlParam(search, 'type', ['washers', 'showers', 'dryers']);
    const filter = getUrlParam(search, 'filter', ['all', 'weekend', 'weekday']);
    const period = getUrlParam(search, 'period', ['day', 'week', 'month']);
    const timeUnit = getUrlParam(search, 'unit', ['day', 'hour']);

    const data = this.state.data;
    if (!data) {
      return <div>Loading...</div>;
    }

    const chartDomain = getChartDomain(type);
    const chartData = getChartData(data, { type, filter, period, timeUnit });
    const labelX = getLabelX({ period, timeUnit });

    const title = getTitle(period);
    const name = getChartName(type);

    return (
      <div className="App">
        <div className="nav">
          <QueryLink query={{ period: null }}>Dag</QueryLink>
          <QueryLink query={{ period: 'week' }}>Uge</QueryLink>
          <QueryLink query={{ period: 'month' }}>Måned</QueryLink>
        </div>

        <h2>
          {title}
        </h2>

        {period === 'day'
          ? <div className="nav">
              <QueryLink query={{ filter: null }}>Alle dage</QueryLink>
              <QueryLink query={{ filter: 'weekday' }}>Hverdag</QueryLink>
              <QueryLink query={{ filter: 'weekend' }}>Weekend</QueryLink>
            </div>
          : null}

        {period === 'week'
          ? <div className="nav">
              <QueryLink query={{ unit: null }}>Per dag</QueryLink>
              <QueryLink query={{ unit: 'hour' }}>Per time</QueryLink>
            </div>
          : null}

        <Chart
          chartDomain={chartDomain}
          name={name}
          data={chartData}
          labelX={labelX}
        />
      </div>
    );
  }
}

export default App;
