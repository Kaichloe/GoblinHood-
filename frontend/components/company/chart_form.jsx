import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { withRouter } from 'react-router-dom';


class ChartForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "1D",
      fiveYearData: {},
      oneDayData: {},
      fiveDayData: {},
      shares: 0,
      form: "BUY",
      price: 0,
      defaultPrice: 0,
      openPrice: 0,
    };
    this.handleMove = this.handleMove.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.customToolTip = this.customToolTip.bind(this);
  }

  componentDidMount() {
    // this.props
    //   .fetchPriceData(this.props.symbol, "5y")
    //   .then((data) => this.setState({ fiveYearData: data }));
    // this.props
    //   .fetchPriceData(this.props.symbol, "5dm")
    //   .then((data) => this.setState({ fiveDayData: data }));
    this.props.fetchPriceData(this.props.symbol, "1d")
      .then((data) => this.setState({ oneDayData: data }))
      .then((data) => this.setState({price: this.props.defaultPrice.close.toFixed(2)}))
      .then((data) => this.setState({defaultPrice: this.props.defaultPrice.close.toFixed(2)}))
      .then((data)=> this.setState({openPrice: this.props.openPrice.open.toFixed(2)}))
      .then((data)=> this.setState({buying_power: this.props.balance}))

  }

  iterator(inputDate){
    let data = this.state.fiveYearData.priceData
    let newData;
    for (let i = data.length-1; i > 0; i--) {
      if (data[i].date === inputDate){
        newData = data.slice(i);
        break;
      }  
    }
    return newData;
  }


  changeDate(input) {
    this.setState({time: input});
  }

  // handleBuy() {
  //   let newState = {
  //     ticker: this.props.symbol,
  //     units: parseInt(this.state.shares),
  //     price: this.currentMarketPrice(),
  //     user_id: this.props.currentUserId,
  //   };
  //   this.setState({ buyStock: newState }, () =>
  //     this.props.buyStock(this.state.buyStock)
  //   );
  // }

  handleLeave() {
    let defaultPrice = this.state.defaultPrice;
    // console.log(defaultPrice)
    // console.log(this.props.openPrice.open)
    this.setState({price: defaultPrice})
  }

  handleMove(e) {  
    // console.log(e.activePayload[0].payload.close)
    if (e.activePayload !== undefined && e.activePayload[0].payload.close !== null) {
      this.setState({ price: e.activePayload[0].payload.close.toFixed(2) });
    }
  } 


  customToolTip({payload}) {
    if (Object.values(payload).length > 0 ) {
      if(this.state.time === "1D" || this.state.time === "1W"){
        return <div className="customTooltip">{payload[0].payload.label} {payload[0].payload.date}</div>
      } else {
        return <div className="customTooltip">{payload[0].payload.date}</div>
      }
    } 
  }

  render() {

    let date = new Date;
    let year = date.getFullYear();
    let day = date.getDate();
    let month = (date.getMonth() + 1);
    let time = this.state.time;
    let data;
    
    if(time === "1D"){
      data = this.state.oneDayData.priceData
    } else if (time === "1W"){
      data = this.state.fiveDayData.priceData
    } else if (time === "5Y" ){
      data = this.state.fiveYearData.priceData
    } else if (time === "1Y"){
      if (day < 10){
        day = [0,day].join("")
      }
      if (month < 10){
        month = [0,month].join("")
      }
      year = year - 1;
      let yearDate = [year,month,day].join("-");
      data = this.iterator(yearDate)
    } else if (time === "3M"){
      month = month - 3;
        if (day < 10){
          day = [0,day].join("")
        }
        if (month < 0 ){
          month = month + 12;
          year = year - 1
        } else if (month < 10 ){
          month = [0, month].join("");
        }
        let threeMonth = [year,month,day].join("-");
        data = this.iterator(threeMonth);
    } else if (time === "1M"){
      month = month - 1;
        if (day < 10 ){
          day = [0,day].join("");
        }
        if (month ===  0 ){
          month = month + 12;
          year = year - 1
        } else if (month < 10){
          month = [0, month].join("");
        }
        let oneMonth = [year,month,day].join("-");
        data = this.iterator(oneMonth);
    }
    //red if stock ends lowers than it is 
    let color;
    if (data !== undefined && data[0].open > data.slice(-1)[0].close){
      color = "#ff0000";
    } else {
      color = "#21ce99";
    }
    
    const stockChart = (

      <LineChart width={600} height={300} data={data} onMouseMove={this.handleMove}
          onMouseLeave={this.handleLeave}>
        <Line
          type="linear"
          dataKey="close"
          stroke={color}
          connectNulls={true}
          strokeWidth={2}
          dot={false}
        />
        <XAxis dataKey="date" hide={true} allowDataOverflow={false} />
        <YAxis domain={["dataMin", "dataMax"]} hide={true} />
        <Tooltip position={{y: 1}} content={this.customToolTip} />
      </LineChart>
    );

    return (
      <div className="StockPage">
        <h3 className="stockname">{this.props.companyName}</h3>

        <div id="price" className="stock-price">
          ${this.state.price}
        </div>
        <div className="stock-change">
          ${(this.state.price - this.state.openPrice).toFixed(2)}
        </div>
        <div className="stock-change-percent">
          [
          {(
            ((this.state.price - this.state.openPrice) / this.state.openPrice) *
            100
          ).toFixed(2)}
          %]
        </div>

        <div className="StockChart">{stockChart}</div>

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
          <button onClick={() => this.handleHover(e)}>TEST</button>
          <button onClick={() => console.log(this.state)}>TEST2</button>
        </div>

      <form action=""></form>
        <div className="transaction-container">
          <div className="transaction-header">
            <button className="transaction-form">
              BUY <span>{this.props.symbol}</span>
            </button>
            <button className="transaction-form">
              SELL <span>{this.props.symbol}</span>
            </button>
          </div>

          <div className="transaction-shares-container">
            <span>Shares</span>
            <input type="text" className="transaction-input" placeholder="0"/>
          </div>

          <div className="transaction-price">
            <span>Market Price</span>
            <span>{this.state.defaultPrice}</span>
          </div>

          <div className="transaction-total">
            <span>Estimated Cost</span>
            <span>{this.state.shares * this.state.defaultPrice}</span>
          </div>
          
          <div className="transaction-submit-container">
            <button className="transaction-button" type="submit">Place Buy Order</button>
          </div>

          <div className="transaction-info">
            ${this.state.buying_power}
          </div>
          
          <div className="transaction-watchlist-button">
            <input type="submit" value="Add to Watchlist"/>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ChartForm);