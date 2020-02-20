import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

class PortfolioChart extends React.Component {
  render() {
    const data = [{ date: '2020-02-05', price: 567 },{ date: '2020-02-06', price: 675 },{ date: '2020-02-07', price: 540 },{ date: '2020-02-08', price: 800 },{ date: '2020-02-09', price: 680 },{ date: '2020-02-10', price: 789 },{ date: '2020-02-11', price: 800 }, { date: '2020-02-12', price: 200 }, { date: '2020-02-13', price: 50 }, { date: '2020-02-14', price: 900 }];

    return (
      <div className="portfolio-container">
        <LineChart width={600} height={250} data={data}>
          <Line type="linear" dataKey="price" stroke="#21CE99" strokeWidth={2}
            dot={false} />
          <XAxis dataKey="date" hide={true} />
          <YAxis hide={true}/>
          <Tooltip/>
        </LineChart>

      <div className="chart-buttons-container">
        <button className='chart-buttons'>1D</button>
        <button className='chart-buttons'>1W</button>
        <button className='chart-buttons'>1M</button>
        <button className='chart-buttons'>1Y</button>
        <button className='chart-buttons'>5Y</button>
      </div>
    </div>
    )
  }
}

export default PortfolioChart;