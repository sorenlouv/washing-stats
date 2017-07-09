import React, { Component } from 'react';
import { getData } from '../services/rest';
import Chart from '../Chart/Chart';
import {
  getByHoursOfDay,
  getByDayOfWeek,
  getByHourOfWeek,
  getByDayOfMonth
} from '../services/utils';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    getData().then(res => {
      this.setState({ data: res.data.Items });
    });
  }

  render() {
    if (!this.state.data) {
      return <div>Loading...</div>;
    }

    const hoursOfDay = getByHoursOfDay(this.state.data);
    const dayOfWeek = getByDayOfWeek(this.state.data);
    const hourOfWeek = getByHourOfWeek(this.state.data);
    const dayOfMonth = getByDayOfMonth(this.state.data);

    return (
      <div className="App">
        <h2>Daglig forbrug (pr time)</h2>
        <Chart data={hoursOfDay} labelX="Klokkeslæt" />

        <h2>Ugentlig forbrug (pr dag)</h2>
        <Chart data={dayOfWeek} labelX="Ugedag" />

        <h2>Ugentlig forbrug (pr time)</h2>
        <Chart data={hourOfWeek} labelX="Ugedag og klokkeslæt" />

        <h2>Månedlig forbrug (pr dag)</h2>
        <Chart data={dayOfMonth} labelX="Dag i måneden" />
      </div>
    );
  }
}

export default App;
