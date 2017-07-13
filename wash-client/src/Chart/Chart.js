import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

let prevLabelX;
function Chart({ data, labelX, name, chartDomain }) {
  const shouldAnimate = !prevLabelX || labelX === prevLabelX;
  console.log(labelX, prevLabelX)
  prevLabelX = labelX;
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
          domain={chartDomain}
          label={{
            value: 'Ledige maskiner',
            position: 'insideLeft',
            angle: -90,
            dy: 20,
            fill: '#888'
          }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />

        <Line
          isAnimationActive={shouldAnimate}
          name={name}
          type="monotone"
          dataKey="avg"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
