import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class ChartForm extends React.Component {
  constructor(props){
    super(props);
    this.maxPrice = this.maxPrice.bind(this);
  }

  componentDidMount(){
    this.props.fetchPriceData(this.props.symbol, "30")
  }
 //60min per data and 5days 

  ChangeDate(range){
    const symbol = this.props.symbol
    switch (range) {
      case "1D":
        return this.props.fetchPriceData(symbol, "1")
      case "1W":
        return this.props.fetchPriceData(symbol, "5")
      case "1M":
        return this.props.fetchPriceData(symbol, "30")
      default:
        break;
    }
  }

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
      <div className="StockPage">
        <div className="StockChart">
          <LineChart width={600} height={300} data={this.parseData()}>
            <Line type="linear" dataKey="price" stroke="#21CE99"  strokeWidth={2}
            dot={false}/>
            <XAxis dataKey="date" hide={true} />
            <YAxis domain={[0, this.maxPrice() + 5]} hide={true} />
          </LineChart>
        </div>

        <div className="chart-buttons">
          <button onClick={()=> this.ChangeDate("1D")}>1D</button>
          <button onClick={() => this.ChangeDate("1W")}>1W</button>
          <button onClick={() => this.ChangeDate("1M")}>1M</button>
          <button onClick={() => this.ChangeDate("1D")}>1Y</button>
          <button onClick={() => this.ChangeDate("1D")}>5Y</button>
        </div>

        {/* <form className="Stockbar">
          <h2>Buy {this.props.symbol}</h2>
            <label>Shares</label>
            <input 
              type="number"
              value={this.state.shares}
              onChange={this.update('shares')}
            />
            <div>
              <span>Market Price</span>
              <span>{}</span>
            </div>
        </form> */}
      </div>
    )
  }
}

export default ChartForm;