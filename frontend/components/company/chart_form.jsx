import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class ChartForm extends React.Component {
  constructor(props){
    super(props)

  }
  componentDidMount(){
    this.props.fetchHistorialPrices(this.props.ticker, )
  }
  render(){
    return (
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="dates" />
        <YAxis />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
    )
  }
}

export default ChartForm;