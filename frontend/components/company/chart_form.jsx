import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { withRouter } from 'react-router-dom';

class ChartForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // shares: 0
    }
    this.maxPrice = this.maxPrice.bind(this);
  }

  componentDidMount(){
    this.props.fetchBigPriceData(this.props.symbol, "2019-12-03")
  }
 //60min per data and 5days 


 oneYearDate() {
  var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear() - 1;

  if (month.length < 2){
     month = '0' + month;
  }
  if (day.length < 2){
    day = '0' + day;
  }
  return [year,month,day].join('-');
}

fiveYearDate(){
  var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear() - 5;

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year,month,day].join('-');
}

  ChangeDate(range){
    const symbol = this.props.symbol;
    switch (range) {
      case "1D":
        return this.props.fetchPriceData(symbol, "1")
      case "1W":
        return this.props.fetchPriceData(symbol, "5")
      case "1M":
        return this.props.fetchPriceData(symbol, "30")
      case "1Y":
        const oneYear = this.oneYearDate();
        // console.log(oneYear)
        return this.props.fetchBigPriceData(symbol,oneYear)
      case "5Y":
        const fiveYears = this.fiveYearDate();
        // console.log(fiveYears)
        return this.props.fetchBigPriceData(symbol,fiveYears)
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
        <h3 className="stockname">{this.props.symbol}</h3>
        <div className="StockChart">
          <LineChart width={600} height={300} data={this.parseData()}>
            <Line type="linear" dataKey="price" stroke="#21CE99"  strokeWidth={2}
            dot={false}/>
            <XAxis dataKey="date" hide={true} />
            <YAxis domain={[0, this.maxPrice() + 5]} hide={true} />
            <Tooltip/>
          </LineChart>
        </div>

        <div className="chart-buttons-container">
          <button className='chart-buttons' onClick={()=> this.ChangeDate("1D")}>1D</button>
          <button className='chart-buttons' onClick={() => this.ChangeDate("1W")}>1W</button>
          <button className='chart-buttons' onClick={() => this.ChangeDate("1M")}>1M</button>
          <button className='chart-buttons' onClick={() => this.ChangeDate("1Y")}>1Y</button>
          <button className='chart-buttons' onClick={() => this.ChangeDate("5Y")}>5Y</button>
        </div>

        {/* <form className="Stockbar">
          <h2>Buy {this.props.symbol}</h2>
            <label>Shares</label>
            <input 
              type="number"
              // value={this.state.shares}
              // onChange={this.update('shares')}
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

export default withRouter(ChartForm);