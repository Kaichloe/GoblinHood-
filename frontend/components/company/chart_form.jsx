import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class ChartForm extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.fetchCompanyHistoricPrices(this.props.ticker,"60", "1")
  }

 //60min per data and 5days 
  parseData(){
    let data = []
    this.props.stock["intraday"].forEach( el => {
      data.unshift({date: el[0], price: el[0][1]["close"]})
    })
    return data 
  }

  render(){
    return (
      <div>
        <LineChart width={600} height={300} data={parseData()}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
          <XAxis dataKey="date" />
          <YAxis />
        </LineChart>
      </div>
    )
  }
}

export default ChartForm;