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

        {/*<Line
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
        />*/}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
