import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class ChartForm extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.fetchHistorialPrices(this.props.ticker,"1D", "30")
  }
  render(){
    return (
      <div>
        <LineChart width={300} height={100} data={data}>
          <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </div>
    )
  }
}

export default ChartForm;