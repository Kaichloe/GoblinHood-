import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

class PortfolioChart extends React.Component {
  render() {
    const data = [{ date: '2020-02-11', price: 800 }, { date: '2020-02-12', price: 200 }, { date: '2020-02-13', price: 500 }, { date: '2020-02-14', price: 100 }];

    return (
      <LineChart width={676} height={196} data={data}>
        <Line type="linear" dataKey="price" stroke="#21CE99" strokeWidth={2}
          dot={false} />
        <XAxis dataKey="date" hide={true} />
        <YAxis hide={true}/>
      </LineChart>
    )
  }
}

export default PortfolioChart;