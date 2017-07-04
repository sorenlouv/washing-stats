import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Legend,
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

function Chart({ data, labelX }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
      >
        <XAxis
          label={{
            value: labelX,
            position: 'insideBottom',
            dy: 15,
            fill: '#888'
          }}
          dataKey="label"
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
        <Legend
          wrapperStyle={{
            top: '-5px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          verticalAlign="top"
          onClick={() => {
            debugger;
          }}
        />

        <Line
          name="Vaskemaskine"
          type="monotone"
          dataKey="washersAvg"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />

        <Line
          name="Tørretumbler"
          type="monotone"
          dataKey="dryersAvg"
          stroke="#82ca9d"
        />

        <Line
          name="Bad"
          type="monotone"
          dataKey="showersAvg"
          stroke="#ff0000"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function App() {
  const hoursOfDay = getByHoursOfDay(sampleData);
  const dayOfWeek = getByDayOfWeek(sampleData);
  const hourOfWeek = getByHourOfWeek(sampleData);
  const dayOfMonth = getByDayOfMonth(sampleData);

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

export default App;
