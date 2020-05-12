import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { withRouter } from 'react-router-dom';
// import Odometer from 'react-odometerjs';


class ChartForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "1D",
      oneYearData: 0,
      oneMonthData: 0,
      threeMonthData: 0,
      fiveYearData: 0,
      oneDayData: 0,
      fiveDayData: 0,
      shares: "",
      form: "BUY",
      price: 0,
      defaultPrice: 0,
      openPrice: 0,
      sharesOwned: '',
      watched: '',
    };
    this.handleWatchlistButton = this.handleWatchlistButton.bind(this);
    this.watchlistButton= this.watchlistButton.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.buyForm = this.buyForm.bind(this);
    this.sellForm = this.sellForm.bind(this);
    this.handleTransaction = this.handleTransaction.bind(this);
    this.renderStockOrFunds = this.renderStockOrFunds.bind(this);
    this.setWatching = this.setWatching.bind(this);
    this.removeWatching = this.removeWatching.bind(this);
    this.priceChange = this.priceChange.bind(this);
    this.percentChange = this.percentChange.bind(this);
  }

  // componentDidUpdate(){
  //   this.checkWatched();
  // }

  componentDidMount() {
    this.props
      .fetchPriceData(this.props.symbol, "1D")
        // .then((data)=> console.log(data))
      .then((data) => this.setState({ oneDayData: data }))
      .then((data) =>
        this.setState({
          price: parseFloat(this.props.defaultPrice.close.toFixed(2)),
        })
      )
      .then((data) =>
        this.setState({
          defaultPrice: parseFloat(this.props.defaultPrice.close.toFixed(2)),
        })
      )
      .then((data) =>
        this.setState({
          openPrice: parseFloat(this.props.openPrice.open.toFixed(2)),
        })
      )
      .then((data) =>
        this.setState({ buying_power: parseFloat(this.props.balance) })
      );
      this.checkWatched();
  }

  checkWatched(){
    let watchlist = this.props.currentUser.watchlist;
    let ticker = this.props.symbol
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].ticker === ticker){
        return this.setState({watched: true})
      }
    }
    this.setState({watched: false })
  }

  setWatching(){
    // debugger
    if (this.state.form = "BUY" && this.state.watched === false ){
      let watchlist_params = {
        user_id: this.props.currentUserId,
        ticker: this.props.symbol
      }
      // console.log(watchlist_params)
      this.props.createWatchStock(watchlist_params).then((res)=>this.setState({ watched: true}))
    }
  }

  removeWatching(){
    let allStocks = this.props.currentUser.owned_stocks;
    let ticker = this.props.symbol;
    let stockTickerCount = allStocks[ticker];
    
    if (stockTickerCount === undefined){
      stockTickerCount = 0 
    }

    if (this.state.watched === true && stockTickerCount > 0 ){
      let watchlist_params = {
        user_id: this.props.currentUserId,
        ticker: this.props.symbol
      };
      this.props.destroyWatchStock(watchlist_params)
      this.setState({watched: false})
    }
  }

  handleWatchlistButton(input){
    return (e) =>{
      e.stopPropagation();
      let watchlist_params = {
        user_id: this.props.currentUserId,
        ticker: this.props.symbol
      };

      if (input === "watch"){
        this.props.createWatchStock(watchlist_params)
        this.setState({watched: true})
      } else if (input === "unwatch") {
        // console.log(watchlist_params)
        this.props.destroyWatchStock(watchlist_params)
        this.setState({watched: false})
      }
    }
  }

  watchlistButton(){
    if (this.state.watched === true){
      return(
        <input type="submit" className="watchlist-button" value="Remove From Watchlist"
          onClick={this.handleWatchlistButton("unwatch")}  
        />
      )
    } else {
      return (
        <input
          type="submit"
          className="watchlist-button"
          value="Add to Watchlist"
          onClick={this.handleWatchlistButton("watch")}
        />
      );
    }
  }

  iterator(timeFrame) {
    if (this.state.fiveYearData === 0){
      this.props
        .fetchPriceData(this.props.symbol, "5y")
        .then((data) => this.setState({ fiveYearData: data }));
    }

    let data = this.state.fiveYearData.priceData;
    let length = data.length;
    let newData;
    
    switch (timeFrame) {
      case "oneMonth":
        newData = data.slice(length - 20)
        this.setState({ oneMonthData: newData })
        break;
      case "threeMonths":
        newData = data.slice(length - 60)
        this.setState({ threeMonthData: newData })
        break;
      case "oneYear":
        newData = data.slice(length - 252)
        this.setState({ oneYearData: newData })
        break;
      default:
        break;
    }
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  buyForm() {
    const submitButton = document.getElementById("transaction-submit-button")
    submitButton.innerHTML = "Place Buy Order";
    this.setState({ shares: "", form: "BUY" });
  }

  sellForm() {
    const submitButton = document.getElementById("transaction-submit-button");
    submitButton.innerHTML = "Place Sell Order";
    this.setState({ shares: "", form: "SELL" });
  }

  handleTransaction(e) {
    e.preventDefault();
    // debugger
    const transactionParams = {
      user_id: this.props.currentUserId,
      ticker: this.props.symbol,
      purchase_price: this.state.defaultPrice,
      quantity: parseInt(this.state.shares),
      transaction_type: this.state.form,
    };
    const currentForm = this.state.form;

    // console.log(this.state.form);
    this.props.createTransaction(transactionParams)
    // .then(() => console.log(this.state.form))
    .then(()=> this.setWatching())
    // .then(() => console.log(this.state.form))
    .then(()=> this.setState({shares: "", form: currentForm}))
    
  }

  renderStockOrFunds(){
    let allStocks = this.props.currentUser.owned_stocks;
    let ticker = this.props.symbol;
    let stockTickerCount = allStocks[ticker];

    if (stockTickerCount === undefined){
      stockTickerCount = 0
    }

    if (this.state.form === "BUY"){
      return (
        <div className="buying-power">
          <p className="transaction-buying-power">
            ${Number(this.props.balance).toLocaleString()}
          </p>
          <p className="transaction-buying-power-word">Buying Power Available</p>
        </div>
      );
    } else {
      return (
      <div className="transaction-shares">
        <p className="transaction-shares-count">You own {stockTickerCount} Shares</p>
      </div>
      )
    }
  }

  renderErrors(){
      if (this.state.shares < 0){
        return(
          <div className="transaction-errors">
            Please enter a valid number of shares
          </div>
        )
      }

      if (this.state.form === "BUY"){
        let totalStockCost = this.state.defaultPrice * this.state.shares;
        let buying_power = this.props.balance;
        if( totalStockCost > buying_power){
          return ( <div className="transaction-errors">
            You do not have enough funds for this transaction
          </div>) 
        }
      }

      if (this.state.form === "SELL"){
        let allStocks = this.props.currentUser.owned_stocks;
        let ticker = this.props.symbol;
        let stockTickerCount = allStocks[ticker];

        if(this.state.shares > stockTickerCount){
          return (
            <div className="transaction-errors">
              You do not own enough shares for this transaction
            </div>
          )
        }
      }
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
    // console.log(defaultPrice)
    // console.log(this.props.openPrice.open)
    this.setState({ price: defaultPrice });
  }

  handleMove(e) {
    if (e.activePayload !== undefined && e.activePayload !== null && e.activePayload[0].payload.close !== null) {
      this.setState({ price: e.activePayload[0].payload.close.toFixed(2) });
    }
  }


  changeDate(input) {
    let data;
    this.setState({ time: input });

    if (input === "1D") {
      data = this.state.oneDayData.priceData;
    } else if (input === "1W") {
        if(this.state.fiveDayData === 0){
          this.props
            .fetchPriceData(this.props.symbol, "5dm")
            .then((data) => this.setState({ fiveDayData: data }));
          data = this.state.fiveDayData.priceData;
        } else {
          data = this.state.fiveDayData.priceData;
        }
    } else if (input === "5Y") {
      if (this.state.fiveYearData === 0) {
        this.props
          .fetchPriceData(this.props.symbol, "5dm")
          .then((data) => this.setState({ fiveYearData: data }));
        data = this.state.fiveYearData.priceData;
      } else {
        data = this.state.fiveYearData.priceData;
      }
    } else if (input === "1Y") {
      if (this.state.oneYearData === 0){
        data = this.iterator("oneYear")
      } else{
        data = this.oneYearData;
      }
    } else if (input === "3M"){
      if (this.state.threeMonthData === 0 ){
        data = this.iterator("threeMonths")
      } else {
        data = this.state.threeMonthData
      }
    } else if (input === "1M"){
      if (this.state.oneMonthData === 0) {
        data = this.iterator("oneMonth")
      } else {
        data = this.state.oneMonthData
      }
    }
  }

  render() {
    let data; 
    let time = this.state.time;

    if (time === "1Y"){
      data = this.state.oneYearData;
    } else if (time === "1D"){
      data = this.state.oneDayData.priceData;
    } else if (time === "1M"){
      data = this.state.oneMonthData;
    } else if (time === "3M"){
      data = this.state.threeMonthData;
    } else if (time === "5Y"){
      data = this.state.fiveYearData.priceData;
    } else if (time === "1W"){
      data = this.state.fiveDayData.priceData;
    }
    //red if stock ends lowers than it is
    let color;
    if (data !== undefined && data[0].open > data.slice(-1)[0].close) {
      color = "#ff0000";
    } else {
      color = "#21ce99";
    }

    const stockChart = (
      <ResponsiveContainer >
        <LineChart
          margin={{ top: 40, right: 30, left: 30, bottom: 50 }}
          data={data}
          onMouseMove={this.handleMove}
          onMouseLeave={this.handleLeave}
        >
          <Line
            type="linear"
            dataKey="close"
            stroke={color}
            connectNulls={true}
            strokeWidth={2}
            dot={false}
          />
          <XAxis dataKey="customDate" hide={true} allowDataOverflow={false} />
          <YAxis domain={["dataMin", "dataMax"]} hide={true} />
          <Tooltip
            contentStyle={{ border: "0", backgroundColor: "transparent" }}
            position={{ y: 1}}
            formatter={(value, name, props) => {
              return [""];
            }}
            isAnimationActive={false}
            cursor={{ stroke: "Gainsboro", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );

    return (
      <>
        <div className="StockPage">
          <h3 className="stockname">{this.props.companyName}</h3>

          <div id="price" className="stock-price">
            ${this.state.price}
          </div>
          <div className="stock-change-container">
            <div className="stock-change">
              {/* ${(this.state.price - this.state.openPrice).toFixed(2)} */}
              {this.priceChange()}
            </div>
            <div className="stock-change-percent">{this.percentChange()}</div>
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
            <button onClick={()=>console.log(this.state)}></button>
            {/* <button onClick={() => console.log(this.setState({watched: false}))}>TEST</button>
          <button onClick={() => console.log(this.state)}>TEST2</button> */}
          </div>
        </div>
        <div className="transaction-container">
          <div className="transaction-header">
            <button
              className={`transaction-form-${this.state.form === "BUY"}`}
              onClick={this.buyForm}
            >
              <span className="transaction-span-form"> Buy {this.props.symbol}</span>
            </button>
            <button
              className={`transaction-form-${this.state.form === "SELL"}`}
              onClick={this.sellForm}
            >
              <span className="transaction-span-form">Sell {this.props.symbol}</span>
            </button>
          </div>

          <form className="transaction-formtype">
            <div className="transaction-shares-container">
              <span className="transaction-span">Shares</span>
              <input
                type="text"
                className="transaction-input"
                placeholder="0"
                onChange={this.update("shares")}
                value={this.state.shares}
              />
            </div>

            <div className="transaction-price">
              <span className="transaction-span">Market Price</span>
              <span className="transaction-span">
                ${this.state.defaultPrice}
              </span>
            </div>

            <div className="transaction-total">
              <span className="transaction-span">Estimated Cost</span>
              <span className="transaction-span">
                ${(this.state.shares * this.state.defaultPrice).toFixed(2)}
              </span>
            </div>

              <div className="transaction-errors">{this.renderErrors()}</div>
            <div className="transaction-submit-container">
              <button
                id="transaction-submit-button"
                className="transaction-button"
                type="submit"
                onClick={this.handleTransaction}
              >
                Place Buy Order
              </button>
            </div>


            <div id="transaction-info" className="transaction-info">
              {this.renderStockOrFunds()}
            </div>

            <div className="transaction-watchlist-button">
              {this.watchlistButton()}
            </div>
            {/* <button onClick={()=> console.log(this.state)}></button> */}
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(ChartForm);