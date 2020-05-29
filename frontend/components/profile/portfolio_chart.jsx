import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "1D",
      oneYearData: {},
      oneMonthData: {},
      threeMonthData: {},
      fiveYearData: {},
      oneDayData: {},
      fiveDayData: {},
      stockPrices: {},
      price: 0,
      openPrice: 0,
      defaultPrice: 0,
    }

    this.priceChange = this.priceChange.bind(this);
    this.percentChange = this.percentChange.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  componentDidMount(){
    let owned_stocks = Object.keys(this.props.ownedStocks)
    console.log(owned_stocks);
    this.props.fetchBigPriceData(owned_stocks).then(data => this.setState({stockPrices : data}))
  }

  priceChange(){
    let change = (this.state.price - this.state.openPrice).toFixed(2);

    if (change > 0){
      return `+$${change}`
    }else {
      return `-$${change}`
    }
  }

  percentChange(){
    let percent = (((this.state.price - this.state.openPrice) / this.state.openPrice) * 100).toFixed(2);
    
    if (percent > 0){
      return `[+${percent}%]`
    } else{
      return `[-${percent}%]`
    }
  }

  handleLeave() {
    let defaultPrice = this.state.defaultPrice;
    this.setState({ price: defaultPrice });
  }

  handleMove(e) {
    if (e.activePayload !== undefined && e.activePayload !== null && e.activePayload[0].payload.close !== null) {
      this.setState({ price: e.activePayload[0].payload.close.toFixed(2) });
    }
  }
  
  render() {

    let data = [
      { date: "2020-02-05", price: 567 },
      { date: "2020-02-06", price: 675 },
      { date: "2020-02-07", price: 540 },
      { date: "2020-02-08", price: 800 },
      { date: "2020-02-09", price: 680 },
      { date: "2020-02-10", price: 789 },
      { date: "2020-02-11", price: 800 },
      { date: "2020-02-12", price: 200 },
      { date: "2020-02-13", price: 50 },
      { date: "2020-02-14", price: 900 },
    ];

    const profileChart = 
      <ResponsiveContainer>
        <LineChart 
          margin={{ top: 40, right: 30, left: 30, bottom: 50 }} 
          data={data}
          onMouseMove={this.handleMove}
          onMouseLeave={this.handleLeave}
          >
            <Line
              type="linear"
              dataKey="price"
              stroke="#21CE99"
              strokeWidth={2}
              dot={false}
            />
            <XAxis dataKey="date" hide={true} />
            <YAxis hide={true} />
            <Tooltip />
          </LineChart>
      </ResponsiveContainer>

    return (
      <div className="StockPage">
        <h3 className="stockname">${this.props.price}</h3>

        {/* <div id="price" className="stock-price">
          ${this.state.price}
        </div> */}
        <div className="stock-change-container">
          <div className="stock-change">
            {/* ${(this.state.price - this.state.openPrice).toFixed(2)} */}
            {this.priceChange()}
          </div>
          <div className="stock-change-percent">{this.percentChange()}</div>
        </div>

        <div className="StockChart">{profileChart}</div>

        <div className="chart-buttons-container">
          <button
            id="button-1"
            className="chart-buttons"
            onClick={() => this.changeDate("1D")}
          >
            1D
            </button>
          <button
            id="button-2"
            className="chart-buttons"
            onClick={() => this.changeDate("1W")}
          >
            1W
            </button>
          <button
            id="button-3"
            className="chart-buttons"
            onClick={() => this.changeDate("1M")}
          >
            1M
            </button>
          <button
            id="button-3"
            className="chart-buttons"
            onClick={() => this.changeDate("3M")}
          >
            3M
            </button>
          <button
            id="button-4"
            className="chart-buttons"
            onClick={() => this.changeDate("1Y")}
          >
            1Y
            </button>
          <button
            id="button-5"
            className="chart-buttons"
            onClick={() => this.changeDate("5Y")}
          >
            5Y
            </button>
            <button onClick={()=> console.log(this.state)}>test</button>
        </div>
      </div>
    );
  }
}

export default PortfolioChart;