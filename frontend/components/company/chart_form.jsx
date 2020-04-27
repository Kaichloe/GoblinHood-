import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { withRouter } from 'react-router-dom';



class ChartForm extends React.Component {
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
      shares: "",
      form: "BUY",
      price: 0,
      defaultPrice: 0,
      openPrice: 0,
      sharesOwned: '',
      watched: null,
      transactionErrors: null
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
  }

  componentDidMount() {
    // this.props
    //   .fetchPriceData(this.props.symbol, "5y")
    //   .then((data) => this.setState({ fiveYearData: data }));
    // this.props
    //   .fetchPriceData(this.props.symbol, "5dm")
    //   .then((data) => this.setState({ fiveDayData: data }));
    this.props
      .fetchPriceData(this.props.symbol, "5d")
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
    debugger
    if (this.state.form = "BUY" && this.state.watched === false ){
      let watchlist_params = {
        user_id: this.props.currentUserId,
        ticker: this.props.symbol
      }
      console.log(watchlist_params)
      this.props.createWatchStock(watchlist_params).then(()=> this.setState({watched: true}))
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
      this.props.destroyWatchStock(watchlist_params).then(() =>
      this.setState({watched: false}))
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
        this.props.createWatchStock(watchlist_params).then(() => this.setState({watched : true}))
      } else if (input === "unwatch") {
        this.props.destroyWatchStock(watchlist_params).then(() => this.setState({watched : false}))
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

  iterator(inputDate, number) {
    let data = this.state.fiveYearData.priceData;
    let newData;
    for (let i = data.length - 1; i > 0; i--) {
      if (data[i].date === inputDate) {
        newData = data.slice(i);
        break;
      }
    }
    switch (number) {
      case 1:
        this.setState({ oneMonthData: newData });
      case 2:
        this.setState({ threeMonthData: newData });
      case 3:
        this.setState({ oneYearData: newData });
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
    this.setState({ shares: 0, form: "BUY" });
  }

  sellForm() {
    const submitButton = document.getElementById("transaction-submit-button");
    submitButton.innerHTML = "Place Sell Order";
    this.setState({ shares: 0, form: "SELL" });
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
    // console.log(transactionParams);
    this.props.createTransaction(transactionParams)
    .then(()=> this.setState({transactionErrors :this.renderErrors()}))
    .then(()=> this.setWatching())
    
  }

  renderStockOrFunds(){
    let allStocks = this.props.currentUser.owned_stocks;
    let ticker = this.props.symbol;
    let stockTickerCount = allStocks[ticker];

    if (stockTickerCount === undefined){
      stockTickerCount = 0
    }

    if (this.state.form === "BUY"){
      return(
      <div className="buying-power">
        ${Number(this.props.balance).toLocaleString()}
        <br/>
        <p>Buying Power Available</p>
      </div>
      )
    } else {
      return (
      <div>
        {stockTickerCount}
        <br/>
        <p>Shares Owned</p>
      </div>
      )
    }
  }

  renderErrors(){
    if (this.props.error.length > 0){
      if (this.state.shares < 0){
        return(
          <div className="invalid-shares">
            Please enter a valid number of shares
          </div>
        )
      }

      if (this.state.form === "BUY"){
        let totalStockCost = this.state.defaultPrice * this.state.shares;
        let buying_power = this.props.balance;
        if( totalStockCost > buying_power){
          return ( <div className="not-enough-funds">
            You do not have enough fund for this transaction
          </div>) 
        }
      }

      if (this.state.form === "SELL"){
        let allStocks = this.props.currentUser.owned_stocks;
        let ticker = this.props.symbol;
        let stockTickerCount = allStocks[ticker];

        if(this.state.shares > stockTickerCount){
          return (
            <div className="not_enough-shares">
              You do not own enough shares for this transaction
            </div>
          )
        }
      }
    }
  }


  handleLeave() {
    let defaultPrice = this.state.defaultPrice;
    // console.log(defaultPrice)
    // console.log(this.props.openPrice.open)
    this.setState({ price: defaultPrice });
  }

  handleMove(e) {
    if (e.activePayload !== undefined ) {
      this.setState({ price: e.activePayload[0].payload.close.toFixed(2) });
    }
  }


  changeDate(input) {
  let date = new Date();
  let year = date.getFullYear();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let data;
  this.setState({ time: input });

  if (input === "1D") {
    data = this.state.oneDayData.priceData;
  } else if (input === "1W") {
    data = this.state.fiveDayData.priceData;
  } else if (input === "5Y") {
    data = this.state.fiveYearData.priceData;
  } else if (input === "1Y") {
    if (day < 10) {
      day = [0, day].join("");
    }
    if (month < 10) {
      month = [0, month].join("");
    }
    year = year - 1;
    let yearDate = [year, month, day].join("-");
    data = this.iterator(yearDate, 3);
  } else if (input === "3M") {
    month = month - 3;
    if (day < 10) {
      day = [0, day].join("");
    }
    if (month < 0) {
      month = month + 12;
      year = year - 1;
    } else if (month < 10) {
      month = [0, month].join("");
    }
    let threeMonth = [year, month, day].join("-");
    data = this.iterator(threeMonth, 2);
  } else if (input === "1M") {
    month = month - 1;
    if (day < 10) {
      day = [0, day].join("");
    }
    if (month === 0) {
      month = month + 12;
      year = year - 1;
    } else if (month < 10) {
      month = [0, month].join("");
    }
    let oneMonth = [year, month, day].join("-");
    data = this.iterator(oneMonth, 1);
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
      <LineChart
        margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
        width={600}
        height={300}
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
          position={{ y: 0 }}
          formatter={(value, name, props) => {
            return [""];
          }}
          isAnimationActive={false}
          cursor={{ stroke: "Gainsboro", strokeWidth: 2 }}
        />
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
          <button onClick={() => console.log(this.state)}>TEST2</button>
        </div>

        <div className="transaction-container">
          <div className="transaction-header">
            <button className="transaction-form" onClick={this.buyForm}>
              BUY <span>{this.props.symbol}</span>
            </button>
            <button className="transaction-form" onClick={this.sellForm}>
              SELL <span>{this.props.symbol}</span>
            </button>
          </div>

          <form className="transaction-formtype">
            <div className="transaction-shares-container">
              <span>Shares</span>
              <input
                type="text"
                className="transaction-input"
                placeholder="0"
                onChange={this.update("shares")}
                value={this.state.shares}
                min="0"
                step="1"
                required
              />
            </div>

            <div className="transaction-price">
              <span>Market Price</span>
              <span>{this.state.defaultPrice}</span>
            </div>

            <div className="transaction-total">
              <span>Estimated Cost</span>
              <span>
                {(this.state.shares * this.state.defaultPrice).toFixed(2)}
              </span>
            </div>

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

            <div className="transaction-errors">
              {this.state.transactionErrors}
            </div>

            <div id="transaction-info" className="transaction-info">
              {this.renderStockOrFunds()}
            </div>
          
            <div className="transaction-watchlist-button">
              {this.watchlistButton()}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(ChartForm);