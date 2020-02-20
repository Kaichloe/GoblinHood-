import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class ChartForm extends React.Component {
  constructor(props){
    super(props);
    this.maxPrice = this.maxPrice.bind(this);
  }

  componentDidMount(){
    this.props.fetchPriceData(this.props.symbol)
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
    let arr = this.props.company.map(el => parseFloat((el[1])));
    return Math.max(...arr);
  }

  render(){
    return (
      <div>
        <LineChart width={600} height={300} data={this.parseData()}>
          <Line type="linear" dataKey="price" stroke="#21CE99"  strokeWidth={2}
          dot={false}/>
          <XAxis dataKey="date" hide={true} />
          <YAxis domain={[0, this.maxPrice() + 5]} hide={true} />
        </LineChart>
      </div>
    )
  }
}

export default ChartForm;