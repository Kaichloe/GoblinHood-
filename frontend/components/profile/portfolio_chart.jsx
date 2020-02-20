import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

class PortfolioChart extends React.Component {
  render() {
    const data = [{ date: '2020-02-11', price: 400 }, { date: '2020-02-12', price: 300 }, { date: '2020-02-13', price: 300 }, { date: '2020-02-14', price: 800 }];

    return (
      <LineChart width='100%'  data={data}>
        <Line type="linear" dataKey="price" stroke="#21CE99" strokeWidth={2}
          dot={false} />
        <XAxis dataKey="date" hide={true} />
        <YAxis hide={true}/>
      </LineChart>
    )
  }
}

export default PortfolioChart;