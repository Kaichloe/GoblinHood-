import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class ChartForm extends React.Component {
  constructor(props){
    super(props);
    this.data = [];
  }

  componentDidMount(){
    this.props.fetchCompanyHistoricPrices(this.props.symbol)
  }
 //60min per data and 5days 

  parseData(){
    let data = []
    this.props.company.forEach( el => {
      data.unshift({date: el[0], price: el[1]})
    })
    return data
  }

  maxPrice() {
    let arr = this.props.company.map(el => parseFloat((el[1]["close"])));
    return Math.max(...arr);
  }

  render(){
    return (
      <div>
        
        <LineChart width={600} height={300} data={this.parseData()}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, this.maxPrice() + 10]} />
        </LineChart>
      </div>
    )
  }
}

export default ChartForm;