import React, { Component } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import sampleData from './sample-data.json';
import {
  getByHoursOfDay,
  getByDayOfWeek,
  getByHourOfWeek,
  getByDayOfMonth
} from './utils';

import './App.css';

const data = getByDayOfMonth(sampleData);

class App extends Component {
  render() {
    return (
      <div className="App">
        <LineChart
          width={800}
          height={400}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
        >
          <XAxis
            label={{
              value: 'Tid',
              position: 'insideBottom',
              dy: 15,
              fill: '#888'
            }}
            dataKey="key"
            tickFormatter={key => {
              return key;
            }}
          />
          <YAxis
            domain={['dataMin - 1', 'dataMax + 1']}
            label={{
              value: 'Antal ledige',
              position: 'insideLeft',
              angle: -90,
              dy: 20,
              fill: '#888'
            }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="washersAvg"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="dryersAvg"
            stroke="#82ca9d"
            label="Tørretumblere"
          />
        </LineChart>
      </div>
    );
  }
}

export default App;
